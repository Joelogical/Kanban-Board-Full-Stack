import React from "react";
import { useEffect, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";

import { retrieveTickets, deleteTicket } from "../api/ticketAPI";
import ErrorPage from "./ErrorPage";
import Swimlane from "../components/Swimlane";
import { TicketData } from "../interfaces/TicketData";
import { ApiMessage } from "../interfaces/ApiMessage";

import auth from "../utils/auth";

const boardStates = ["Todo", "In Progress", "Done"];

const Board = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets();
      setTickets(data);
    } catch (err) {
      console.error("Failed to retrieve tickets:", err);
      setError(true);
    }
  };

  const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId);
      fetchTickets();
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (loginCheck) {
      fetchTickets();
    }
  }, [loginCheck]);

  if (error) {
    return <ErrorPage />;
  }

  if (!loginCheck) {
    return <div className="login-notice">Please log in to view the board.</div>;
  }

  return (
    <div className="board">
      <div className="board-display">
        {boardStates.map((state) => (
          <Swimlane
            key={state}
            title={state}
            tickets={tickets.filter((ticket) => ticket.status === state)}
            deleteTicket={deleteIndvTicket}
          />
        ))}
      </div>
      <Link to="/create" className="create-ticket-link">
        <button>Create New Ticket</button>
      </Link>
    </div>
  );
};

export default Board;
