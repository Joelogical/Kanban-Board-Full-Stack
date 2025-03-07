import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Add detailed environment logging
console.log("=== Database Connection Debug ===");
console.log("Environment variables:", {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD ? "[HIDDEN]" : "not set",
});

const sequelize = new Sequelize(
  process.env.DB_NAME || "kanban_db",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "Thinkofanew1!",
  {
    host: "localhost",
    dialect: "postgres",
    logging: console.log,
  }
);

// Test the connection
console.log("Testing database connection...");
sequelize
  .authenticate()
  .then(() => console.log("✅ Database connection successful"))
  .catch((err) => {
    console.error("❌ Database connection error:", err);
    console.error("Connection details:", {
      database: process.env.DB_NAME || "kanban_db",
      user: process.env.DB_USER || "postgres",
      host: "localhost",
      error_code: err.code,
      error_message: err.message,
    });
  });

export default sequelize;
