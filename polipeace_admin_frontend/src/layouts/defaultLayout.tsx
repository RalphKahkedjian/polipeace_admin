import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useStateContext } from '../contexts/contextProvider';
import Sidebar from '../components/Sidebar';
import logouticon from '../assets/images/logouticon.png';

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case '/':
      return 'Dashboard';
    case '/admins':
      return 'Admins';
    case '/posts':
      return 'Posts';
    case '/votes':
      return 'Votes';
    case '/announcements':
      return 'Announcements';
    case '/meetings':
      return 'Meetings';
    case '/users':
      return 'Users';
    case '/profile':
      return 'Profile';
    default:
      return '';
  }
};

export default function DefaultLayout() {
  const { token, setToken, user } = useStateContext();
  const location = useLocation();
  const titlePage = getPageTitle(location.pathname);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div>
      <Sidebar />
      <div className='all-content'>
        <h3 className="pt-2" style={{color:'#1A1A1A', fontSize:'2.1em'}}>{titlePage}</h3>
        <div className='logout-button'>
          <div className="button-outlet" onClick={handleLogout}>
            <p className="pt-3" style={{ letterSpacing: '1px', fontWeight: '500', marginRight: '30px' }}>
              {user}
            </p>
            <div className="button-outlet-inside">
              <img src={logouticon} alt="Logout Icon" />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
