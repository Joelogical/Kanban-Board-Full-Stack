import { Request, Response } from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  console.log("Login attempt:", { username });

  try {
    // Find user
    const user = await User.findOne({ where: { username } });
    console.log("User found:", user ? "Yes" : "No");

    if (!user || !user.password) {
      console.log("Invalid credentials - user not found or no password");
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Invalid credentials - password mismatch");
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate token
    if (!process.env.JWT_SECRET_KEY) {
      console.log("JWT_SECRET_KEY not found in environment variables");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign(
      { username: user.username, id: user.id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    console.log("Login successful for user:", username);
    return res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
