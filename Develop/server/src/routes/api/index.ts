import { Router } from "express";
import ticketRouter from "./ticket-routes.js";
import userRouter from "./user-routes.js";

const router = Router();

console.log("Setting up API routes");
router.use("/tickets", ticketRouter);
router.use("/users", userRouter);

export default router;
