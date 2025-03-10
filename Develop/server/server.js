import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import sequelize from "./src/config/connection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Debug environment variables
console.log("Environment check from server.js:");
console.log("Current directory:", process.cwd());
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

// Test database connection before starting server
try {
  await sequelize.authenticate();
  console.log("Database connection successful");
} catch (err) {
  console.error("Database connection error:", err);
  process.exit(1);
} 