import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Add detailed environment logging
console.log("=== Database Connection Debug ===");
console.log("Environment variables:", {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL_EXISTS: !!process.env.DATABASE_URL,
  RENDER: process.env.RENDER === "true",
  DATABASE_URL_PREVIEW: process.env.DATABASE_URL
    ? `${process.env.DATABASE_URL.slice(0, 15)}...`
    : "not set",
});

// Force production mode if running on Render
const isProduction =
  process.env.RENDER === "true" || process.env.NODE_ENV === "production";
console.log("Production mode:", isProduction);

let sequelize: Sequelize;

try {
  if (isProduction) {
    console.log("Attempting production database connection...");
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is required in production");
    }
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: console.log,
    });
    console.log("Production Sequelize instance created");
  } else {
    console.log("Attempting development database connection...");
    sequelize = new Sequelize("kanban_db", "postgres", "postgres", {
      host: "localhost",
      dialect: "postgres",
      logging: console.log,
    });
    console.log("Development Sequelize instance created");
  }

  // Test the connection
  console.log("Testing database connection...");
  sequelize
    .authenticate()
    .then(() => console.log("✅ Database connection successful"))
    .catch((err) => {
      console.error("❌ Database connection error:", err);
      console.error("Connection details:", {
        isProduction,
        host: isProduction ? "from DATABASE_URL" : "localhost",
        database: isProduction ? "from DATABASE_URL" : "kanban_db",
        error_code: err.code,
        error_message: err.message,
      });
    });
} catch (error) {
  console.error("❌ Error during Sequelize initialization:", error);
  throw error;
}

export default sequelize;
