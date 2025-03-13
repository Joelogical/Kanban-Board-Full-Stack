import express, { Request, Response } from "express";
import { Ticket, User } from "../../models/index";

const router = express.Router();

// Debug middleware
router.use((req, res, next) => {
  console.log("Ticket route accessed:", req.method, req.path);
  next();
});

// GET /tickets - Get all tickets
const getAllTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await Ticket.findAll({
      include: [{ model: User, as: "assignedUser", attributes: ["username"] }],
    });
    res.json(tickets);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /tickets/:id - Get a ticket by id
const getTicketById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByPk(id, {
      include: [{ model: User, as: "assignedUser", attributes: ["username"] }],
    });
    if (ticket) res.json(ticket);
    else res.status(404).json({ message: "Ticket not found" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /tickets - Create a new ticket
const createTicket = async (req: Request, res: Response) => {
  try {
    const ticket = await Ticket.create(req.body);
    res.status(201).json(ticket);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /tickets/:id - Update a ticket by id
const updateTicket = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByPk(id);
    if (ticket) {
      await ticket.update(req.body);
      res.json(ticket);
    } else {
      res.status(404).json({ message: "Ticket not found" });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /tickets/:id - Delete a ticket by id
const deleteTicket = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByPk(id);
    if (ticket) {
      await ticket.destroy();
      res.json({ message: "Ticket deleted" });
    } else {
      res.status(404).json({ message: "Ticket not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.post("/", createTicket);
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);

export default router;
