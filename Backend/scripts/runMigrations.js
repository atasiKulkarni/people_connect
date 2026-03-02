require('dotenv').config();
import runAllMigrations from '../migrations/index.js';

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