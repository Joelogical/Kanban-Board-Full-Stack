import path from "path";
import dotenv from "dotenv";
import express from "express";
import sequelize from "./config/connection.js";
import { User, Ticket } from "./models/index.js";
import apiRoutes from "./routes/api/index.js";

console.log("=====================================");
console.log("Server starting...");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Current directory:", process.cwd());
console.log("=====================================");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Debug route to check models
app.get("/debug", (req, res) => {
  res.json({
    userModel: !!User,
    ticketModel: !!Ticket,
    sequelize: !!sequelize,
    ticketMethods: Object.keys(Ticket),
    dbConnected: sequelize
      .authenticate()
      .then(() => true)
      .catch(() => false),
  });
});

// Simple model check
app.get("/model-check", (req, res) => {
  console.log("Model check route hit");
  res.json({
    ticket: {
      model: !!Ticket,
      methods: Object.getOwnPropertyNames(Ticket),
      prototype: Object.getOwnPropertyNames(Ticket.prototype),
    },
  });
});

// Database check
app.get("/db-check", async (req, res) => {
  try {
    await sequelize.authenticate();
    const ticketCount = await Ticket.count();
    res.json({
      connection: "success",
      models: {
        Ticket: {
          count: ticketCount,
          tableName: Ticket.tableName,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      connection: "failed",
      error: error.message,
      stack: error.stack,
    });
  }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api", apiRoutes);

// Debug route to test ticket controller directly
app.get("/test-tickets", async (req, res) => {
  try {
    console.log("Testing direct ticket access");
    console.log("Ticket model exists:", !!Ticket);
    console.log("Ticket model methods:", Object.keys(Ticket));
    const tickets = await Ticket.findAll();
    console.log("Found tickets:", tickets);
    res.json(tickets);
  } catch (error: any) {
    console.error("Error in test-tickets:", error);
    console.error("Full error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Test route to create a ticket
app.post("/test-create-ticket", async (req, res) => {
  try {
    const testTicket = await Ticket.create({
      name: "Test Ticket",
      status: "Open",
      description: "This is a test ticket",
    });
    res.json(testTicket);
  } catch (error: any) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ message: error.message });
  }
});

// Debug route to test router mounting
app.get("/test-router", (req, res) => {
  res.json({
    routes: app._router.stack
      .filter((r) => r.route)
      .map((r) => ({
        path: r.route.path,
        methods: Object.keys(r.route.methods),
      })),
  });
});

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

// Also add error handling middleware at the end
app.use((err, req, res, next) => {
  console.error("Global error handler caught:", err);
  res.status(500).json({ message: err.message });
});
