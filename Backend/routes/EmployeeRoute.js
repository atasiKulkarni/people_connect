const express = require('express');
const router = express.Router();

const {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  uploadMiddleware,
  deleteEmployee,
  // getTodayBirthdays,
  // getTodayAnniversaries
} = require('../controllers/EmployeeController.js');

router.get("/", getEmployees);
// router.get('/birthdays', getTodayBirthdays);
// router.get('/anniversary', getTodayAnniversaries);
router.get("/:id", getEmployeeById);
router.post("/", uploadMiddleware,addEmployee);
router.put("/:id", uploadMiddleware,updateEmployee);
router.delete("/:id", deleteEmployee);



module.exports = router;