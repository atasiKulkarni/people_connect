const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "people-connect",
  password: "bts@2025",
  port: 5432,
});
module.exports = pool;
