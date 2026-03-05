const pool = require('../config/db');

const EventsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      employee_id INT NOT NULL REFERENCES Employee(id),

      -- Define the type of event (e.g., 'birthday', 'anniversary', 'leave')
      event_type VARCHAR(50) NOT NULL, 
      event_date DATE NOT NULL,
      details TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log("✅ Table 'events' created successfully for birthdays, anniversaries, and leaves.");
  } catch (err) {
    console.error("❌ Error creating events table:", err.message);
  }
};

module.exports = EventsTable;