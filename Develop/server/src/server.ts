import path from "path";
import dotenv from "dotenv";
import express from "express";
import sequelize from "./config/connection.js";
import { User, Ticket } from "./models/index.js";
import apiRoutes from "./routes/api/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Debug route to check models
app.get("/debug", (req, res) => {
  res.json({
    userModel: !!User,
    ticketModel: !!Ticket,
    sequelize: !!sequelize,
  });
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api", apiRoutes);

// Basic test route
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Debug environment variables
console.log("Environment check from server.js:");
console.log("Current directory:", process.cwd());
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

// Test database connection before starting server
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection successful");
    // Sync all models
    return sequelize.sync();
  })
  .then(() => {
    // Start Express server after database connection is confirmed
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });
