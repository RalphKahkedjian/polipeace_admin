import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from './layouts/defaultLayout';
import GuestLayout from "./layouts/guestLayout";
import Registration from "./views/Registration";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Dashboard from "./views/Dashboard";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path:'/',
        element: <Dashboard />
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/register',
        element: <Registration />,
      },
      {
        path: '/login',
        element: <Login />,
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  }
]);

export default router;
