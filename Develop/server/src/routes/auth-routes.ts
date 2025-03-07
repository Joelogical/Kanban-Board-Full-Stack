import { Router, Request, Response } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = async (req: Request, res: Response) => {
  // Looks up user by username
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user || !user.password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  // Compares the password with the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);

  if (!process.env.JWT_SECRET_KEY) {
    return res.status(500).json({ message: "Server configuration error" });
  }

  // Gets JWT token
  const token = jwt.sign(
    {
      username: user.username,
      id: user.id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "24h" }
  );

  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post("/login", login);

export default router;
