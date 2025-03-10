const Sequelize = require("sequelize");

// Debug environment
console.log("Environment check:");
console.log("Current directory:", process.cwd());
console.log("All environment variables:", Object.keys(process.env));
console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("Is DATABASE_URL defined?", !!process.env.DATABASE_URL);

// Ensure DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Force SSL for Render
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  dialect: "postgres",
  logging: console.log, // Enable query logging
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Unable to connect to database:", err);
  });

module.exports = sequelize;
