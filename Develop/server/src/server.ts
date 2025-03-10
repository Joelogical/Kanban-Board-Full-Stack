import path from "path";
import dotenv from "dotenv";
import express from "express";
import apiRoutes from "./routes/api/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api", apiRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
  });
}

// Debug environment variables
console.log("Environment check from server.js:");
console.log("Current directory:", process.cwd());
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

// Import connection after environment variables are loaded
import sequelize from "./config/connection.js";

// Test database connection before starting server
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection successful");
    // Start Express server after database connection is confirmed
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });
