import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

console.log("Environment variables loaded:", {
  DATABASE_URL: process.env.DATABASE_URL ? "Set" : "Not set",
  NODE_ENV: process.env.NODE_ENV,
});

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: console.log, // Enable SQL query logging
});

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.error("Database connection error:", err));

export default sequelize;
