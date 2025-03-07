import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const sequelize = isProduction
  ? new Sequelize(process.env.DATABASE_URL!, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize("kanban_db", "postgres", "postgres", {
      host: "localhost",
      dialect: "postgres",
      logging: false,
    });

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.error("Database connection error:", err));

export default sequelize;
