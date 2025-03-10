import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

console.log("=== Environment Variables Debug ===");
console.log("1. Checking all environment variables...");
console.log({
  DATABASE_URL: !!process.env.DATABASE_URL,
  JWT_SECRET_KEY: !!process.env.JWT_SECRET_KEY,
  NODE_ENV: process.env.NODE_ENV || "not set",
});

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

db
  .authenticate()
  .then(() => console.log("✅ Database connection successful"))
  .catch((err) => {
    console.error("❌ Database connection error");
    console.error("Error details:", {
      message: err.message,
      code: err.original?.code,
      errno: err.original?.errno,
    });
  });

export default db;
