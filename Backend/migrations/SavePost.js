const pool = require('../config/db');

const SavePost = async () => {
  const query = `
 CREATE TABLE IF NOT EXISTS SavePost (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES Engage(id) ON DELETE CASCADE,
    user_name VARCHAR(255), -- In a real app, use user_id
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(post_id, user_name) -- Prevents a user from liking the same post twice
    );
  `;
  try {
    await pool.query(query);
    console.log("✅ Table 'SavePost' created successfully.");
  } catch (err) {
    console.error("❌ Error creating 'SavePost' table:", err.message);
  } finally {
    pool.end(); // Close the DB connection
  }
};

SavePost();
