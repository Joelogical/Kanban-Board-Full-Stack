import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Add detailed environment logging
console.log("=== Database Connection Debug ===");
console.log("Environment variables:", {
  DATABASE_URL_EXISTS: !!process.env.DATABASE_URL,
  DATABASE_URL_PREVIEW: process.env.DATABASE_URL
    ? `${process.env.DATABASE_URL.slice(0, 15)}...`
    : "not set",
});

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: console.log,
});

// Test the connection
console.log("Testing database connection...");
sequelize
  .authenticate()
  .then(() => console.log("✅ Database connection successful"))
  .catch((err) => {
    console.error("❌ Database connection error:", err);
    console.error("Connection details:", {
      error_code: err.code,
      error_message: err.message,
    });
    process.exit(1); // Exit if we can't connect to the database
  });

export default sequelize;
