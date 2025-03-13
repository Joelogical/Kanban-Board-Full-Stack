import { Model, Optional } from "sequelize";

// User types
export interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// Ticket types
export interface TicketAttributes {
  id: number;
  name: string;
  status: string;
  description: string;
  assignedUserId?: number;
}

export interface TicketCreationAttributes extends Optional<TicketAttributes, "id"> {} 