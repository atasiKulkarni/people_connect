var express = require("express");
var router = express.Router();
const {
  fetchTodayBirthdays,
  fetchTodayAnniversaries,
  fetchTodayLeaves,
  getTodayEvents,
} = require("../controllers/EventController");

router.get("/todays-birthdays", fetchTodayBirthdays);
router.get("/todays-anniversary", fetchTodayAnniversaries);
router.get("/todays-leaves", fetchTodayLeaves);
router.get("/", getTodayEvents);

module.exports = router;
