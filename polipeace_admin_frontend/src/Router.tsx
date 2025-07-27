import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from './layouts/defaultLayout';
import GuestLayout from "./layouts/guestLayout";
import Registration from "./views/Registration";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Dashboard from "./views/Dashboard";
import Meeting from "./views/Meeting";
import Admins from "./views/Admins";
import Users from "./views/Users";
import Profile from "./views/Profile";
import UserForm from "./views/userForm";
import AdminForm from "./views/adminForm";
import MeetingForm from "./views/meetingForm";
import Announcement from "./views/Announcement";
import AnnouncementForm from "./views/announcementForm";
import Votes from "./views/Votes";
import VotesForm from "./views/votesForm";
const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: 'admins', element: <Admins /> },
      { path: 'admins/new', element: <AdminForm /> },
      { path: 'users', element: <Users /> },
      { path: 'users/new', element: <UserForm />},
      { path: 'profile', element: <Profile />},
      { path: 'meetings', element: <Meeting />},
      { path: 'meetings/new', element: <MeetingForm />},
      { path: 'announcements', element: <Announcement />},
      { path: 'announcements/new', element: <AnnouncementForm />},
      { path: 'votings', element: <Votes />},
      { path: 'votings/new', element: <VotesForm />},
      { path: '*', element: <NotFound />}
    ]
  },
  {
    path: '/guest',
    element: <GuestLayout />,
    children: [
      { path: 'register', element: <Registration /> },
      { path: 'login', element: <Login /> }
    ]
  },
]);

export default router;
