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
console.log("Testing database connection...");
sequelize
  .authenticate()
  .then(() => console.log("✅ Database connection successful"))
  .catch((err) => {
    console.error("❌ Database connection error:", err);
    // Check if PostgreSQL service is running
    const { exec } = require("child_process");
    exec("sc query postgresql", (error, stdout, stderr) => {
      if (error) {
        console.error("Could not check PostgreSQL service status");
        return;
      }
      console.log("PostgreSQL Service Status:", stdout);
    });
  });

export default sequelize;
