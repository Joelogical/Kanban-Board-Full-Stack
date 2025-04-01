import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { sequelize, User } from "./models/index";
import routes from "./routes/index.js";
import bcrypt from "bcryptjs";
import { seedUsers } from "./seeds/user-seeds.js";

const app = express();
const PORT = process.env.PORT || 3002;

// Debug logging
app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} ${req.path}, Body:`,
    req.body
  );
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
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// API Routes
app.use("/", routes);

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

const initializeDatabase = async () => {
  try {
    // Force sync to recreate all tables
    await sequelize.sync({ force: true });
    console.log("Database synced");

    // Seed the database
    await seedUsers();
    console.log("Database seeded");

    // Create a test user manually to verify
    const testUser = await User.create({
      username: "test",
      password: "password123",
      email: "test@example.com",
    });
    console.log("Test user created:", testUser.username);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database initialization error:", error);
    process.exit(1);
  }
};

initializeDatabase();
