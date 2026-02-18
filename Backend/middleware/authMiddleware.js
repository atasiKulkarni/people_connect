// backend/middleware/auth.js
const jwt = require("jsonwebtoken");
const jwksClientLib = require("jwks-rsa");
const fetch = require("node-fetch");
const HttpsProxyAgent = require("https-proxy-agent");

// ===== ENV =====
const {
  AZURE_TENANT_ID,
  EXPECTED_AUDIENCE,   // e.g., api://ab38f303-d51a-4898-8214-aa7905459c37
  AZURE_CLIENT_ID,     // optional fallback if you prefer
  EXPECTED_ISSUER,     // optional comma-separated allow-list
  HTTPS_PROXY          // optional
} = process.env;

const expectedAudience = EXPECTED_AUDIENCE || AZURE_CLIENT_ID;
const defaultIssuers = [
  `https://login.microsoftonline.com/${AZURE_TENANT_ID}/v2.0`,
  `https://sts.windows.net/${AZURE_TENANT_ID}/`
];
const expectedIssuers = (EXPECTED_ISSUER
  ? EXPECTED_ISSUER.split(",").map(s => s.trim()).filter(Boolean)
  : defaultIssuers);

if (!AZURE_TENANT_ID || !expectedAudience) {
  console.warn("[AUTH] Missing AZURE_TENANT_ID or EXPECTED_AUDIENCE/AZURE_CLIENT_ID. Token validation may fail.");
}

const agent = HTTPS_PROXY ? new HttpsProxyAgent(HttpsProxyAgent.prototype ? HTTPS_PROXY : { proxy: HTTPS_PROXY }) : undefined;

// ===== Metadata + JWKS caches =====
const metadataCache = new Map();   // metadata URL -> JSON
const jwksClientCache = new Map(); // jwks_uri -> client

async function getOpenIdMetadata(iss, tid) {
  const base = `https://login.microsoftonline.com/${tid}`;
  const metadataUrl = iss.includes("/v2.0")
    ? `${base}/v2.0/.well-known/openid-configuration`
    : `${base}/.well-known/openid-configuration`;

  if (metadataCache.has(metadataUrl)) return metadataCache.get(metadataUrl);

  const resp = await fetch(metadataUrl, { agent });
  if (!resp.ok) throw new Error(`Failed to fetch OpenID metadata: ${metadataUrl} -> ${resp.status}`);
  const json = await resp.json();
  metadataCache.set(metadataUrl, json);
  return json;
}

function getJwksClient(jwksUri) {
  if (jwksClientCache.has(jwksUri)) return jwksClientCache.get(jwksUri);
  const client = jwksClientLib({
    jwksUri,
    cache: true,
    cacheMaxEntries: 50,
    cacheMaxAge: 10 * 60 * 1000,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    requestAgent: agent,
    timeout: 30000
  });
  jwksClientCache.set(jwksUri, client);
  return client;
}

async function verifyTokenWithDynamicJwks(token) {
  const decoded = jwt.decode(token, { complete: true });
  if (!decoded?.header?.kid) throw new Error("Missing 'kid' in token header");
  const iss = decoded?.payload?.iss;
  const tid = decoded?.payload?.tid || AZURE_TENANT_ID;
  if (!iss) throw new Error("Missing 'iss' claim");
  if (!tid) throw new Error("Missing 'tid' and AZURE_TENANT_ID");

  const metadata = await getOpenIdMetadata(iss, tid);
  const jwksUri = metadata.jwks_uri;
  if (!jwksUri) throw new Error("OpenID metadata missing 'jwks_uri'");
  const client = getJwksClient(jwksUri);

  const getKey = (header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
      if (err) return callback(err);
      callback(null, key.getPublicKey());
    });
  };

  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getKey,
      {
        algorithms: ["RS256"],
        audience: expectedAudience,
        issuer: expectedIssuers,
        clockTolerance: 30
      },
      (err, verified) => (err ? reject(err) : resolve(verified))
    );
  });
}

/** Middleware: requireAuth
 *  - Extracts Bearer token
 *  - Verifies signature, issuer, audience
 *  - Attaches claims to req.user
 */
async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ error: "Authentication required: missing Bearer token" });
    }

    const verified = await verifyTokenWithDynamicJwks(token);
    req.user = verified; // attach claims for downstream use
    next();
  } catch (err) {
    console.error("[AUTH] verify error:", err.message);
    return res.status(401).json({ error: "Invalid token", details: err.message });
  }
}

/** Middleware: requireScope('sso_login_backend', ...)
 *  - Ensures token has required scopes (in 'scp' claim for delegated flows)
 */
function requireScope(...scopes) {
  return (req, res, next) => {
    const scp = req.user?.scp || req.user?.scopes || "";
    const tokenScopes = Array.isArray(scp) ? scp : String(scp).split(" ").filter(Boolean);
    const ok = scopes.every(s => tokenScopes.includes(s));
    if (!ok) {
      return res.status(403).json({
        error: "Insufficient scope",
        required: scopes,
        tokenScopes
      });
    }
    next();
  };
}

module.exports = {
  requireAuth,
  requireScope,
  // export this in case you want a verification endpoint:
  verifyTokenWithDynamicJwks
};