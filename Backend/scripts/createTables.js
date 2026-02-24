require('dotenv').config();
const pool = require('../config/db');

async function createTables() {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS Banners (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image_url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    await pool.query(query);
    console.log("✅ Table 'Banners' created successfully.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating table:", err.message);
    process.exit(1);
  }
}

createTables();