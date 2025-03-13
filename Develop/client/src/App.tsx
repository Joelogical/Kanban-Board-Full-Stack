import React from 'react';
import { 
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet
} from 'react-router-dom';
import Board from './pages/Board';
import Login from './pages/Login';

const Layout = () => (
  <div>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
    <h1>Kanban Board</h1>
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Board />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
