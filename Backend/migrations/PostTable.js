const pool = require('../config/db');

const PostTable = async () => {
  const query = `
 CREATE TABLE IF NOT EXISTS Engage (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,    -- 'birthday' or 'anniversary'
    title VARCHAR(255),   
    description TEXT,      
    employee_name VARCHAR(100) NOT NULL, -- The specific person's name (e.g., "Akshay Prabhakar Ingole")
    image_url TEXT,                     -- Optional background image URL
    created_by VARCHAR(100),  
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log("✅ Table 'Engage' created successfully.");
  } catch (err) {
    console.error("❌ Error creating 'Engage' table:", err.message);
  } finally {
    pool.end(); // Close the DB connection
  }
};

PostTable();
