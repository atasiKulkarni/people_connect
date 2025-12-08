const pool = require("../config/db");
const multer = require("multer");

// Configure storage for multer (same as above)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-CA', {
    timeZone: 'Asia/Kolkata' // Ensures correct local date
  });
};
  
const getEmployees = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Employee ORDER BY id ASC");
    const formatted = result.rows.map(emp => ({
      ...emp,
      dob: formatDate(emp.dob),
      doj: formatDate(emp.doj)
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get employee by ID
const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM Employee WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).send("Employee not found");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Add new employee
const addEmployee = async (req, res) => {
  const { first_name,last_name,gender, employee_id, designation, department, email, mobile, office_location, dob, doj, martial_status, reporting_manager, delivery_head, emergency_contact_name, emergency_contact, emergency_contact_relation, blood_group, total_experence, current_company_experence, aadhar, pan, passport, current_address,permanent_address } = req.body;

  const profile_picture = req.files['profile_picture'] ? `/public/${req.files['profile_picture'][0].filename}` : null;
  const resume = req.files['resume'] ? `/public/${req.files['resume'][0].filename}` : null;
 
  // if (!profile_picture || !resume) {
  //   // Be more specific about which file is missing
  //   return res.status(400).send(`Missing file: ${!profile_picture ? 'Profile Picture' : 'Resume'}`);
  // }

  try {
    const result = await pool.query(
      `INSERT INTO Employee (
        first_name, last_name, gender, employee_id, designation, department, email, mobile, 
        profile_picture, dob, doj, office_location, martial_status, reporting_manager, 
        delivery_head, emergency_contact_name, emergency_contact, emergency_contact_relation, 
        blood_group, total_experence, current_company_experence, aadhar, pan, 
        passport, current_address, permanent_address, resume) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27) 
      RETURNING *`,
      [first_name, last_name, gender, employee_id, designation, department, email, mobile, profile_picture, dob, doj, office_location, martial_status, reporting_manager, delivery_head, emergency_contact_name, emergency_contact, emergency_contact_relation, blood_group, total_experence, current_company_experence, aadhar, pan, passport, current_address, permanent_address, resume]
    );
    const formatted = result.rows.map(emp => ({
      ...emp,
      dob: formatDate(emp.dob),
      doj: formatDate(emp.doj)
    }));

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update employee
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, profile_picture, dob, doj } = req.body;
  try {
    const result = await pool.query(
      "UPDATE Employee SET name = $1, email = $2, mobile = $3, profile_picture = $4, dob = $5, doj = $6 WHERE id = $7 RETURNING *",
      [name, email, mobile, profile_picture, dob, doj, id]
    );
    if (result.rows.length === 0)
      return res.status(404).send("Employee not found");
    const formatted = result.rows.map(emp => ({
      ...emp,
      dob: formatDate(emp.dob),
      doj: formatDate(emp.doj)
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM Employee WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).send("Employee not found");
    res.send("Employee deleted successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  uploadMiddleware: upload.fields([
    { name: 'profile_picture', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
  ]),  deleteEmployee,
};
