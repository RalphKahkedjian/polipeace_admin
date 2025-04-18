import { useState } from 'react';
import '../components/Sidebar.css';

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState('Dashboard');

  const menuItems = [
    'Dashboard', 'Posts', 'Votes', 'Announcements',
    'Meetings', 'Users', 'Admins', 'Profile'
  ];

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h2>Polipeace</h2>
      </div>

      <div className="sidebar-links">
        <ul>
          {menuItems.map(item => (
            <li key={item}>
              <a
                href="#"
                className={activeLink === item ? 'active' : ''}
                onClick={() => setActiveLink(item)}
              >
                {item}
              </a>
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
