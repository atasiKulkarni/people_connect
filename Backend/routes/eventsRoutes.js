var express = require("express");
var router = express.Router();
const {requireAuth} = require('../middleware/authMiddleware.js');
const {
  fetchTodayBirthdays,
  fetchTodayAnniversaries,
  fetchTodayLeaves,
  getTodayEvents,
} = require("../controllers/EventController.js");

router.get("/todays-birthdays", requireAuth,fetchTodayBirthdays);
router.get("/todays-anniversary", requireAuth,fetchTodayAnniversaries);
router.get("/todays-leaves", requireAuth,fetchTodayLeaves);
router.get("/", requireAuth,getTodayEvents);

module.exports = router;
