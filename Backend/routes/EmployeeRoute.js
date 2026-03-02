const express = require('express');
const router = express.Router();
const {requireAuth} = require('../middleware/authMiddleware.js');

const {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  uploadMiddleware,
  deleteEmployee,
} = require('../controllers/EmployeeController.js');

router.get("/", requireAuth,getEmployees);
router.get("/:id", requireAuth,getEmployeeById);
router.post("/", requireAuth,uploadMiddleware,addEmployee);
router.put("/:id", requireAuth,uploadMiddleware,updateEmployee);
router.delete("/:id", requireAuth,deleteEmployee);



module.exports = router;