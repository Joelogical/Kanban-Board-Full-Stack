import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize("kanban_db", "postgres", "Thinkofanew1!", {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    dialectOptions: {
        connectTimeout: 60000,
    },
});
// Test the connection
console.log("Attempting to connect to PostgreSQL...");
console.log("Connection config:", {
    database: "kanban_db",
    host: "localhost",
    port: 5432,
    user: "postgres",
});
sequelize
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
export default sequelize;
