"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const express_1 = require("express");
const user_js_1 = require("../models/user.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const login = async (req, res) => {
    // Looks up user by username
    const { username, password } = req.body;
    const user = await user_js_1.User.findOne({ where: { username } });
    if (!user || !user.password) {
        return res.status(401).json({ message: "Invalid username or password" });
    }
    // Compares the password with the hashed password
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid username or password" });
    }
    console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);
    if (!process.env.JWT_SECRET_KEY) {
        return res.status(500).json({ message: "Server configuration error" });
    }
    // Gets JWT token
    const token = jsonwebtoken_1.default.sign({
        username: user.username,
        id: user.id,
    }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
    return res.json({ token });
};
exports.login = login;
const router = (0, express_1.Router)();
// POST /login - Login a user
router.post("/login", exports.login);
exports.default = router;
