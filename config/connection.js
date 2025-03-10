const Sequelize = require("sequelize");

// Debug environment
console.log("Environment check from connection.js:");
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "exists" : "not found");

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Force postgres:// protocol
const dbUrl = process.env.DATABASE_URL.replace(/^postgresql:/, "postgres:");
console.log(
  "Using database URL starting with:",
  dbUrl.split("@")[0].substring(0, 15) + "..."
);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
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
