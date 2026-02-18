const pool = require("../config/db");

const fetchTodayBirthdays = async (req, res) => {
  try {
    // Uses PostgreSQL EXTRACT to compare month and day of 'dob' with the current date
    const query = `
      SELECT first_name, last_name, email, dob, profile_picture, designation, department
      FROM Employee
      WHERE EXTRACT(MONTH FROM dob) = EXTRACT(MONTH FROM CURRENT_DATE)
        AND EXTRACT(DAY FROM dob) = EXTRACT(DAY FROM CURRENT_DATE);
    `;
    const result = await pool.query(query);
    // res.json(result.rows); // Returns only relevant fields for the event
    return result.rows.map((row) => ({ ...row, event_type: "birthday" }));
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const fetchTodayAnniversaries = async (req, res) => {
  try {
    // Uses PostgreSQL EXTRACT to compare month and day of 'doj' with the current date
    const query = `
      SELECT first_name, last_name, email, doj, profile_picture, designation, department
      FROM Employee
      WHERE EXTRACT(MONTH FROM doj) = EXTRACT(MONTH FROM CURRENT_DATE)
        AND EXTRACT(DAY FROM doj) = EXTRACT(DAY FROM CURRENT_DATE);
    `;
    const result = await pool.query(query);
    // res.json(result.rows); // Returns only relevant fields for the event
    return result.rows.map((row) => ({ ...row, event_type: "anniversary" }));
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const fetchTodayLeaves = async (req, res) => {
  try {
    const query = `
      SELECT 
          L.employee_id, L.leave_date, L.status,
          E.first_name, E.last_name, E.email, E.designation, E.department
      FROM 
          Leaves L
      JOIN 
          Employee E ON L.employee_id = E.id
      WHERE 
          L.leave_date = CURRENT_DATE
          AND L.status = 'Approved';
    `;
    const result = await pool.query(query);
    // res.json(result.rows);
    return result.rows.map((row) => ({ ...row, event_type: "leave" }));
  } catch (err) {
    // If the 'Leaves' table doesn't exist, or there's another DB error,
    // log it, but return an empty array so the main API doesn't crash.
    console.error("Could not fetch leaves data:", err.message);
    return [];
  }
};
const getTodayEvents = async (req, res) => {
  try {
    const birthdays = await fetchTodayBirthdays();
    const anniversaries = await fetchTodayAnniversaries();
    const leaves = await fetchTodayLeaves();

    // Combine all results into a single object or array
    const allEvents = {
      today: new Date().toISOString().split("T")[0], // YYYY-MM-DD format
      birthdays: birthdays,
      anniversaries: anniversaries,
      leaves: leaves,
      totalEvents: birthdays.length + anniversaries.length + leaves.length,
    };

    res.json(allEvents);
  } catch (err) {
    // Log the error carefully. The 'Leaves' query might be the issue if the table doesn't exist.
    console.error("Error fetching today's events:", err.message);
    res.status(500).send("Error fetching today's events: " + err.message);
  }
};

module.exports = {
  fetchTodayBirthdays, // Keep these separate exports if needed for other APIs
  fetchTodayAnniversaries,
  fetchTodayLeaves,
  getTodayEvents, // Export the new combined API handler
};
