const express = require('express');
const router = express.Router();
const {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  uploadMiddleware,
  deleteEmployee
} = require('../controllers/EmployeeController.js');

router.get("/", getEmployees);
router.get("/:id", getEmployeeById);
router.post("/", uploadMiddleware,addEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;