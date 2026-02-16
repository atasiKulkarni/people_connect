
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const fetch = require("node-fetch"); // npm i node-fetch@2 (if not already)
const HttpsProxyAgent = require("https-proxy-agent");

// Env
const {
  AZURE_TENANT_ID,
  EXPECTED_AUDIENCE,   // set to api://<YOUR_API_APP_CLIENT_ID>
  AZURE_CLIENT_ID,     // fallback only
  EXPECTED_ISSUER,     // optional: comma-separated allow-list
  HTTPS_PROXY          // optional: http(s)://user:pass@host:port
} = process.env;


const expectedAudience = EXPECTED_AUDIENCE || AZURE_CLIENT_ID;
const defaultIssuers = [
  `https://login.microsoftonline.com/${AZURE_TENANT_ID}/v2.0`,
  `https://sts.windows.net/${AZURE_TENANT_ID}/`
];
const expectedIssuers = (EXPECTED_ISSUER
  ? EXPECTED_ISSUER.split(",").map(s => s.trim()).filter(Boolean)
  : defaultIssuers);

// Cache metadata + jwks clients per jwks_uri
const metadataCache = new Map();     // key: metadata URL -> openid config JSON
const jwksClientCache = new Map();   // key: jwks_uri -> jwksClient

const agent = HTTPS_PROXY ? new HttpsProxyAgent(HTTPS_PROXY) : undefined;

async function getOpenIdMetadata(iss, tid) {
  const base = `https://login.microsoftonline.com/${tid}`;
  const metadataUrl = iss.includes("/v2.0")
    ? `${base}/v2.0/.well-known/openid-configuration`
    : `${base}/.well-known/openid-configuration`;

  if (metadataCache.has(metadataUrl)) return metadataCache.get(metadataUrl);

  const resp = await fetch(metadataUrl, { agent });
  if (!resp.ok) {
    throw new Error(`Failed to fetch OpenID metadata: ${metadataUrl} -> ${resp.status}`);
  }
  const json = await resp.json();
  metadataCache.set(metadataUrl, json);
  return json;
}

function getJwksClient(jwksUri) {
  if (jwksClientCache.has(jwksUri)) return jwksClientCache.get(jwksUri);
  const client = jwksClient({
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
  // Decode (unverified) to choose metadata endpoints
  const decoded = jwt.decode(token, { complete: true });
  if (!decoded?.header?.kid) throw new Error("Missing 'kid' in token header");
  const iss = decoded?.payload?.iss;
  const tid = decoded?.payload?.tid || AZURE_TENANT_ID;
  if (!iss) throw new Error("Missing 'iss' claim");
  if (!tid) throw new Error("Missing 'tid' and AZURE_TENANT_ID");

  // 1) Resolve OpenID metadata for this issuer/tenant
  const metadata = await getOpenIdMetadata(iss, tid);
  // 2) Use the jwks_uri provided by metadata (v1 may be /common/discovery/keys)
  const jwksUri = metadata.jwks_uri;
  if (!jwksUri) throw new Error("OpenID metadata missing 'jwks_uri'");
  const client = getJwksClient(jwksUri);

  // 3) Build getKey for jsonwebtoken
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
        issuer: expectedIssuers, // accept both v2 and sts
        clockTolerance: 30
      },
      (err, decodedVerified) => (err ? reject(err) : resolve(decodedVerified))
    );
  });
}

const verifySSO = async (req, res) => {
  try {
    const authHeader = req.headers.authorization || "";
    const tokenFromHeader = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    const token = tokenFromHeader || req.body?.Token;
    if (!token) return res.status(400).json({ error: "Token required" });

    // Optional diagnostics (remove in prod)
    const d = jwt.decode(token, { complete: true });
    console.log("alg:", d?.header?.alg, "kid:", d?.header?.kid);
    console.log("aud:", d?.payload?.aud, "iss:", d?.payload?.iss, "tid:", d?.payload?.tid);
    console.log("scp:", d?.payload?.scp, "roles:", d?.payload?.roles);

    const decoded = await verifyTokenWithDynamicJwks(token);
    return res.json({ message: "Login successful", user: decoded });
  } catch (err) {
    console.error("Verification Error:", err);
    return res.status(401).json({ error: "Invalid token", details: err.message });
  }
};

module.exports = { verifySSO };