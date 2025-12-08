
const pool = require("../config/db");
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-CA', {
    timeZone: 'Asia/Kolkata' // Ensures correct local date
  });
};

const getBirthdays = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT name, dob, profile_picture
      FROM employee_details
      WHERE EXTRACT(MONTH FROM dob) = EXTRACT(MONTH FROM CURRENT_DATE)
        AND EXTRACT(DAY FROM dob) = EXTRACT(DAY FROM CURRENT_DATE)
    `);
    const formatted = result.rows.map(emp => ({
      ...emp,
      dob: formatDate(emp.dob),
      doj: formatDate(emp.doj)
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getAnniversaries = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT name, doj, profile_picture,
             EXTRACT(YEAR FROM AGE(CURRENT_DATE, doj)) AS years_completed
      FROM employee_details
      WHERE EXTRACT(MONTH FROM doj) = EXTRACT(MONTH FROM CURRENT_DATE)
        AND EXTRACT(DAY FROM doj) = EXTRACT(DAY FROM CURRENT_DATE)
    `);
    const formatted = result.rows.map(emp => ({
      ...emp,
      // dob: formatDate(emp.dob),
      doj: formatDate(emp.doj)
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {  getBirthdays,  getAnniversaries};