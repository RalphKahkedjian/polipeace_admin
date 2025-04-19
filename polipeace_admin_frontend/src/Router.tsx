import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from './layouts/defaultLayout';
import GuestLayout from "./layouts/guestLayout";
import Registration from "./views/Registration";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Dashboard from "./views/Dashboard";
import Admins from "./views/Admins";
import Users from "./views/Users";
import Profile from "./views/Profile";
const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'admins', element: <Admins /> },
      { path: 'users', element: <Users /> },
      { path: 'profile', element: <Profile />}
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      { path: 'register', element: <Registration /> },
      { path: 'login', element: <Login /> }
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  }
]);

export default router;
