import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const config = {
    database: "kanban_db",
    username: "postgres",
    password: "Thinkofanew1!",
    host: "127.0.0.1", // Using IP instead of localhost
    port: 5432,
    dialect: "postgres",
};
console.log("Attempting connection with:", {
    ...config,
    password: "[HIDDEN]",
});
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    dialectOptions: {
        connectTimeout: 60000,
    },
    retry: {
        max: 3,
    },
});
// Test the connection
console.log("Testing database connection...");
sequelize
    .authenticate()
    .then(() => console.log("✅ Database connection successful"))
    .catch((err) => {
    console.error("❌ Database connection error:", err);
    if (err.original) {
        console.error("Original error:", {
            code: err.original.code,
            errno: err.original.errno,
            syscall: err.original.syscall,
            address: err.original.address,
            port: err.original.port,
        });
    }
});
export default sequelize;
