import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { sequelize, User } from "./models/index";
import apiRoutes from "./routes/api/index";
import authRoutes from "./routes/auth-routes";
import bcrypt from "bcryptjs";

const app = express();
const PORT = process.env.PORT || 3001;

// Debug logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware for development
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// API Routes
app.use("/api", apiRoutes);
app.use("/auth", authRoutes);

// Serves static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(process.cwd(), "dist/client")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(process.cwd(), "dist/client/index.html"));
  });
}

// Basic test route
app.get("/test", (req, res) => {
  res.json({ message: "Server is running" });
});

const forceDatabaseRefresh = false;

sequelize
  .sync({ force: forceDatabaseRefresh })
  .then(async () => {
    // Create test user
    try {
      await User.findOrCreate({
        where: { username: "test" },
        defaults: {
          username: "test",
          password: await bcrypt.hash("password123", 10),
          email: "test@example.com",
        },
      });
    } catch (error) {
      console.error("Error creating test user:", error);
    }

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });
