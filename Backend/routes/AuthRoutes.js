const express = require("express");
const router = express.Router();
const { verifySSO } = require("../middleware/authMiddleware");

// POST /api/auth/sso
router.post("/sso", verifySSO, (req, res) => {
  // If verification succeeds, req.user is available
  return res.json({ message: "Login successful", user: req.user });
});

module.exports = router;
``