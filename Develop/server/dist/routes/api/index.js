"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticket_routes_1 = __importDefault(require("./ticket-routes"));
const user_routes_1 = __importDefault(require("./user-routes"));
const router = (0, express_1.Router)();
// Debug middleware
router.use((req, res, next) => {
    console.log("API route accessed:", req.method, req.path);
    next();
});
// Test route
router.get("/test", (req, res) => {
    res.json({ message: "API router is working" });
});
router.use("/tickets", ticket_routes_1.default);
router.use("/users", user_routes_1.default);
exports.default = router;
