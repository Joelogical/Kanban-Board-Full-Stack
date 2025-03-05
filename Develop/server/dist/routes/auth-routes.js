import { Router } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const login = async (req, res) => {
    // Looks up user by username
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }
    // Compares the password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
    return res.json({ token });
};
const router = Router();
// POST /login - Login a user
router.post("/login", login);
export default router;
