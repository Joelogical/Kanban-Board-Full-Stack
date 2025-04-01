"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || "kanban_db", process.env.DB_USER || "postgres", process.env.DB_PASSWORD || "Thinkofanew1!", {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false,
});
console.log("Attempting to connect to PostgreSQL...");
sequelize
    .authenticate()
    .then(() => console.log("✅ Database connection successful"))
    .catch((err) => {
    console.error("❌ Database connection error:", err.message);
});
exports.default = sequelize;
