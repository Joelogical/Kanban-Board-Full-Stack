
# Kanban Board Application

A full-stack Kanban board application built with React, TypeScript, and Node.js. This application allows users to manage tasks using a drag-and-drop interface with secure authentication.

## Features

- Secure user authentication with JWT
- Drag-and-drop task management
- Real-time task updates
- Responsive design
- PostgreSQL database integration

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [Your GitHub Repository URL]
cd Kanban-Board-Full-Stack
```

2. Set up the server:
```bash
cd Develop/server
npm install
```

3. Create a `.env` file in the `Develop/server` directory with the following variables:
```env
DB_USERNAME=postgres
DB_PASSWORD=Thinkofanew1!
JWT_SECRET_KEY=your_secret_key_here
```

4. Set up the client:
```bash
cd ../client
npm install
```

## Running the Application

1. Start the server:
```bash
cd Develop/server
npm start
```

2. In a new terminal, start the client:
```bash
cd Develop/client
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Default Test User

You can use the following credentials to test the application:
- Username: `test`
- Password: `password123`

## Development Status

⚠️ **Note**: This application is currently in production and may have limited functionality or be unavailable at times. Please check back later for updates.

