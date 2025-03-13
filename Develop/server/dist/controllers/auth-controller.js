"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find user
        const user = await user_1.User.findOne({ where: { username } });
        if (!user || !user.password) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        // Check password
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        // Generate token
        if (!process.env.JWT_SECRET_KEY) {
            return res.status(500).json({ message: "Server configuration error" });
        }
        const token = jsonwebtoken_1.default.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
        return res.json({ token });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.login = login;
