const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");

// POST /api/auth/sso
router.post("/sso", requireAuth, (req, res) => {
  // If verification succeeds, req.user is available
  return res.json({ message: "Login successful", user: req.user });
});

module.exports = router;
``