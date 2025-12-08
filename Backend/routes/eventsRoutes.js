var express = require('express');
var router = express.Router();
const {  getBirthdays,  getAnniversaries} = require('../controllers/eventController.js');

router.get("/birthdays",getBirthdays );
router.get("/anniversaries",getAnniversaries );

module.exports = router;
