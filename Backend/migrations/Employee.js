const pool = require('../config/db');

const Employee = async () => {
  const query = `
  CREATE TABLE IF NOT EXISTS Employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  profile_picture TEXT,
  gender VARCHAR(10) NOT NULL,
  employee_id VARCHAR(50) NOT NULL,
  designation VARCHAR(50) NOT NULL,
  department VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  mobile VARCHAR(10) NOT NULL,
  office_location VARCHAR(50) NOT NULL,
  dob DATE NOT NULL,
  doj DATE NOT NULL,
  martial_status VARCHAR(10) ,
  reporting_manager VARCHAR(50) NOT NULL,
  delivery_head VARCHAR(50) NOT NULL,
  emergency_contact_name VARCHAR(50) ,
  emergency_contact VARCHAR(10) ,
  emergency_contact_relation VARCHAR(50) ,
  blood_group VARCHAR(50) ,
  total_experence VARCHAR(10) ,
  current_company_experence VARCHAR(10) ,
  aadhar VARCHAR(50) ,
  pan VARCHAR(50) ,
  passport VARCHAR(50) ,
  current_address VARCHAR(100) NOT NULL,
  permanent_address VARCHAR(100) ,
  resume TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  `;
  try {
    await pool.query(query);
    console.log("✅ Table 'employee_details' created successfully.");
  } catch (err) {
    console.error("❌ Error creating 'employee_details' table:", err.message);
  } finally {
    pool.end(); // Close the DB connection
  }
};

Employee();