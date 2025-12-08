const pool = require('../config/db');

const Banners = async () => {
  const query = `
 CREATE TABLE IF NOT EXISTS Banners (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  `;
  try {
    await pool.query(query);
    console.log("✅ Table 'Banners' created successfully.");
  } catch (err) {
    console.error("❌ Error creating 'Banners' table:", err.message);
  } finally {
    pool.end(); // Close the DB connection
  }
};

Banners();