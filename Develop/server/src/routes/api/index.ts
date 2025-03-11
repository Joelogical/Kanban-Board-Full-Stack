import { Router } from "express";
import { ticketRouter } from "./ticket-routes.js";
import { userRouter } from "./user-routes.js";

const router = Router();

// Debug middleware
router.use((req, res, next) => {
  console.log("API route accessed:", req.method, req.path);
  next();
});

router.use("/tickets", ticketRouter);
router.use("/users", userRouter);

export default router;
