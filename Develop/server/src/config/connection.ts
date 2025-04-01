import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "kanban_db",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "Thinkofanew1!",
  {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false,
  }
);

console.log("Attempting to connect to PostgreSQL...");

sequelize
  .authenticate()
  .then(() => console.log("✅ Database connection successful"))
  .catch((err) => {
    console.error("❌ Database connection error:", err.message);
  });

export default sequelize;
