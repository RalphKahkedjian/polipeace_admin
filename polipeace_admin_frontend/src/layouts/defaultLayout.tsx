import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/contextProvider';
import Sidebar from '../components/Sidebar';
import logouticon from  '../assets/images/logouticon.png'


export default function DefaultLayout() {
  const { token, setToken } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: '260px' }}>
        <Outlet />
        <div style={{ position: 'absolute', right: '10px', top: '15px' }}>
          <div className="button-outlet" onClick={handleLogout}>
            <p className='pt-3' style={{letterSpacing:'1px', fontWeight:'500', marginRight:'30px'}}>
              Logout
            </p>
            <div className="button-outlet-inside">
              <img src={logouticon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
