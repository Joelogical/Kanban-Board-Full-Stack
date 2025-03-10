const Sequelize = require("sequelize");

// Debug environment
console.log("Environment check:");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DATABASE_URL value type:", typeof process.env.DATABASE_URL);
console.log(
  "DATABASE_URL first 10 chars:",
  process.env.DATABASE_URL?.substring(0, 10)
);

// Ensure DATABASE_URL exists and starts with postgres://
const dbUrl = process.env.DATABASE_URL?.replace(/^postgresql:/, "postgres:");

if (!dbUrl) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sequelize = new Sequelize(dbUrl, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  dialect: "postgres",
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
