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

console.log("\n=== Database Connection Debug ===");
console.log("1. Database URL details:");
const dbUrl = process.env.DATABASE_URL;
console.log("Protocol:", dbUrl.split(":")[0]);
console.log("Host:", dbUrl.split("@")[1]?.split("/")[0]);

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

console.log("\n2. Testing connection...");

sequelize
  .authenticate()
  .then(() => {
    console.log("✓ Database connection successful");
  })
  .catch((err) => {
    console.error("✗ Database connection failed:", err.message);
  });

export default sequelize; 