const express = require('express');
const router = express.Router();
const {requireAuth} = require('../middleware/authMiddleware.js');

const {fetchTodayBirthdays, fetchTodayAnniversaries, fetchTodayLeaves, getTodayEvents} = require('../controllers/EventController.js')

router.get("/birthday", requireAuth,fetchTodayBirthdays);
router.get("/work-anniversary", requireAuth,fetchTodayAnniversaries);
router.get("/leaves", requireAuth,fetchTodayLeaves);
router.get("/events", requireAuth,getTodayEvents);




module.exports = router;