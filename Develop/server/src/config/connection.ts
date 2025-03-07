import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize("kanban_db", "postgres", "Thinkofanew1!", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

// Test the connection
console.log("Testing database connection...");
sequelize
  .authenticate()
  .then(() => console.log("✅ Database connection successful"))
  .catch((err) => {
    console.error("❌ Database connection error:", err);
    console.error("Details:", err.message);
  });

export default sequelize;
