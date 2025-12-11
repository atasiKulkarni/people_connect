const pool = require('../config/db');

const Leaves = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Leaves (
      leave_id SERIAL PRIMARY KEY,
      
      -- This links back to your main Employee table's ID column
      employee_id INT NOT NULL REFERENCES Employee(id),

      leave_date DATE NOT NULL,
      status VARCHAR(50) NOT NULL CHECK (status IN ('Pending', 'Approved', 'Rejected')),
      reason TEXT,
      applied_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log("✅ Table 'Leaves' created successfully.");
  } catch (err) {
    console.error("❌ Error creating Leaves table:", err.message);
  } finally {
    pool.end(); // Close the DB connection after the operation
  }
};

Leaves();
