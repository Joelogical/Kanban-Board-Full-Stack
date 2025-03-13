"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../../models/index");
const router = express_1.default.Router();
// Debug middleware
router.use((req, res, next) => {
    console.log("Ticket route accessed:", req.method, req.path);
    next();
});
// GET /tickets - Get all tickets
const getAllTickets = async (req, res) => {
    try {
        const tickets = await index_1.Ticket.findAll({
            include: [{ model: index_1.User, as: "assignedUser", attributes: ["username"] }],
        });
        res.json(tickets);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// GET /tickets/:id - Get a ticket by id
const getTicketById = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await index_1.Ticket.findByPk(id, {
            include: [{ model: index_1.User, as: "assignedUser", attributes: ["username"] }],
        });
        if (ticket)
            res.json(ticket);
        else
            res.status(404).json({ message: "Ticket not found" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// POST /tickets - Create a new ticket
const createTicket = async (req, res) => {
    try {
        const ticket = await index_1.Ticket.create(req.body);
        res.status(201).json(ticket);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// PUT /tickets/:id - Update a ticket by id
const updateTicket = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await index_1.Ticket.findByPk(id);
        if (ticket) {
            await ticket.update(req.body);
            res.json(ticket);
        }
        else {
            res.status(404).json({ message: "Ticket not found" });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// DELETE /tickets/:id - Delete a ticket by id
const deleteTicket = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await index_1.Ticket.findByPk(id);
        if (ticket) {
            await ticket.destroy();
            res.json({ message: "Ticket deleted" });
        }
        else {
            res.status(404).json({ message: "Ticket not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.post("/", createTicket);
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);
exports.default = router;
