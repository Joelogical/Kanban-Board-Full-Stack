const Sequelize = require("sequelize");

// Debug environment
console.log("Environment check from connection.js:");
console.log("Running from:", process.cwd());
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "exists" : "not found");

const sequelize = new Sequelize(process.env.DATABASE_URL || "", {
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
