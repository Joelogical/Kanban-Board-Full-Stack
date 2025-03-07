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
const sequelize = new Sequelize("kanban_db", "postgres", "postgres", {
    host: "localhost",
    dialect: "postgres",
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
        database: "kanban_db",
        user: "postgres",
        host: "localhost",
        error_code: err.code,
        error_message: err.message,
    });
});
export default sequelize;
