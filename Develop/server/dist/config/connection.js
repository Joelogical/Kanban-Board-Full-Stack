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
const sequelize = new Sequelize("kanban_db", "postgres", "Thinkofanew1!", {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
// Test the connection
console.log("Testing database connection...");
sequelize
    .authenticate()
    .then(() => console.log("✅ Database connection successful"))
    .catch((err) => {
    console.error("❌ Database connection error:", err);
    console.error("Connection details:", err.original || err);
});
export default sequelize;
