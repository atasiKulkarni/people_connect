const pool = require('../config/db');

const createProductTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      event_name VARCHAR(255) NOT NULL,
      emp_name VARCHAR(255) NOT NULL,
      image TEXT,
      year NUMERIC(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log("✅ Table 'events' created successfully.");
  } catch (err) {
    console.error("❌ Error creating table:", err.message);
  } finally {
    pool.end(); // Close the DB connection
  }
};

createProductTable();