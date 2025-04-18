import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/contextProvider';
import Sidebar from '../components/Sidebar';
import logouticon from  '../assets/images/logouticon.png'


const getPageTitle =(pathname: string) => {
  switch(pathname) {
    case '/':
      return 'Dashboard'
    default:
      return ''
  }
}

export default function DefaultLayout() {
  const { token, setToken, user } = useStateContext();
  const titlePage = getPageTitle(location.pathname)
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: '260px', marginTop:'10px' }}>
        <Outlet />
        <h3 className='mt-4'>
          {titlePage}
        </h3>
        <div style={{ position: 'absolute', right: '10px', top: '15px' }}>
          <div className="button-outlet" onClick={handleLogout}>
            <p className='pt-3' style={{letterSpacing:'1px', fontWeight:'500', marginRight:'30px'}}>
              {user}
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
