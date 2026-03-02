require('dotenv').config();

if (!process.env.DATABASE_URL) {
  console.error("❌ ERROR: DATABASE_URL not found in .env file!");
  process.exit(1);
}

const runAllMigrations = require('../migrations');

async function runMigrations() {
  try {
    await runAllMigrations();
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration script failed:", err.message);
    process.exit(1);
  }
}

runMigrations();