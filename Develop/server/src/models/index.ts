import dotenv from "dotenv";
dotenv.config();

console.log("Starting model initialization...");

import { Sequelize } from "sequelize";
import { UserFactory } from "./user.js";
import { TicketFactory } from "./ticket.js";
import sequelize from "../config/connection.js";

console.log("About to initialize User model...");
const User = UserFactory(sequelize);
console.log("About to initialize Ticket model...");
const Ticket = TicketFactory(sequelize);

console.log("Models initialized:", {
  User: !!User,
  Ticket: !!Ticket,
});

console.log("Setting up associations...");
User.hasMany(Ticket, { foreignKey: "assignedUserId" });
Ticket.belongsTo(User, { foreignKey: "assignedUserId", as: "assignedUser" });
console.log("Associations complete");

export { sequelize, User, Ticket };
