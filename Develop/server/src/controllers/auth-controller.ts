import { Request, Response } from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ where: { username } });
    if (!user || !user.password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate token
    if (!process.env.JWT_SECRET_KEY) {
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign(
      { username: user.username, id: user.id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    return res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}; 