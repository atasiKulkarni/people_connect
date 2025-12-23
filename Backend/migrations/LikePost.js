const pool = require('../config/db');

const LikePost = async () => {
  const query = `
 CREATE TABLE IF NOT EXISTS LikePost (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES Engage(id) ON DELETE CASCADE,
    user_name VARCHAR(255), -- In a real app, use user_id
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(post_id, user_name) -- Prevents a user from liking the same post twice
    );
  `;
  try {
    await pool.query(query);
    console.log("✅ Table 'LikePost' created successfully.");
  } catch (err) {
    console.error("❌ Error creating 'LikePost' table:", err.message);
  } finally {
    pool.end(); // Close the DB connection
  }
};

LikePost();
