import { NavLink, NavLinkProps } from 'react-router-dom';
import '../components/Sidebar.css';

export default function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Posts', path: '/posts' },
    { name: 'Votes', path: '/votes' },
    { name: 'Announcements', path: '/announcements' },
    { name: 'Meetings', path: '/meetings' },
    { name: 'Users', path: '/users' },
    { name: 'Admins', path: '/admins' },
    { name: 'Profile', path: '/profile' }
  ];

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h2>Polipeace</h2>
      </div>

      <div className="sidebar-links">
        <ul>
          {menuItems.map(({ name, path }) => (
            <li key={name}>
              <NavLink
                to={path}
                className={({ isActive }: { isActive: boolean }) =>
                  isActive ? 'active' : ''
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-footer">
        <p>&copy; Ralph Kahkedjian 2025</p>
      </div>
    </div>
  );
}
