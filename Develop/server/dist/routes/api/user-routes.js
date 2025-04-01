"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../../models/index");
const router = express_1.default.Router();
// GET /users - Get all users
router.get("/", async (req, res) => {
    try {
        const users = await index_1.User.findAll();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// GET /users/:id - Get a user by id
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await index_1.User.findByPk(id);
        if (user)
            res.json(user);
        else
            res.status(404).json({ message: "User not found" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// POST /users - Create a new user
router.post("/", async (req, res) => {
    try {
        const user = await index_1.User.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// PUT /users/:id - Update a user by id
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await index_1.User.findByPk(id);
        if (user) {
            await user.update(req.body);
            res.json(user);
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// DELETE /users/:id - Delete a user by id
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await index_1.User.findByPk(id);
        if (user) {
            await user.destroy();
            res.json({ message: "User deleted" });
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
