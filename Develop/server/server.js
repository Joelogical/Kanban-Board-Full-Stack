const path = require("path");
require("dotenv").config();

// Debug environment variables
console.log("Environment check from server.js:");
console.log("Current directory:", process.cwd());
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

// Import connection after environment variables are loaded
const sequelize = require("./src/config/connection");

// Test database connection before starting server
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection successful");
    // Start your server here
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  }); 