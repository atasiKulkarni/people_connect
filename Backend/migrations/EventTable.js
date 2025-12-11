const pool = require('../config/db');

const EventsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      
      -- Reference the Employee table (assuming you have one with a primary key 'id')
      employee_id INT NOT NULL REFERENCES Employee(id),

      -- Define the type of event (e.g., 'birthday', 'anniversary', 'leave')
      event_type VARCHAR(50) NOT NULL, 

      -- The specific date the event occurs (can use this for leaves too)
      event_date DATE NOT NULL,

      -- Optional details like leave status or reason
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


// --- Execution ---
(async () => {
    try {
        await EventsTable();
    } catch (error) {
        console.error("An error occurred during table creation process:", error.message);
    } finally {
        // Close the DB connection
        pool.end(); 
    }
})();
