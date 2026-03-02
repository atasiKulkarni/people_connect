const createBannersTable = require('./Banners');
const createEmployeeTable = require('./Employee');
const createEventsTable = require('./EventTable');
const createPostsTable = require('./PostTable');

const runAllMigrations = async () => {
  try {
    console.log("🔄 Starting database migrations...\n");
    
    await createEmployeeTable();
    await createBannersTable();
    await createEventsTable();
    await createPostsTable();
    
    console.log("\n✅ All migrations completed successfully!");
  } catch (err) {
    console.error("❌ Migration failed:", err.message);
    throw err;
  }
};

module.exports = runAllMigrations;