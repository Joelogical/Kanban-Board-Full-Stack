import { Router } from "express";
import ticketRouter from "./ticket-routes";
import userRouter from "./user-routes";

const router = Router();

// Debug middleware
router.use((req, res, next) => {
  console.log("API route accessed:", req.method, req.path);
  next();
});

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "API router is working" });
});

router.use("/tickets", ticketRouter);
router.use("/users", userRouter);

export default router;
