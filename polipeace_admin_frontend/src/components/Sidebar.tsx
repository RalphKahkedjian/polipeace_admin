import '../components/Sidebar.css'

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h2>Polipeace</h2>
      </div>

      <div className="sidebar-links">
        <ul>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Posts</a></li>
          <li><a href="#">Votes</a></li>
          <li><a href="#">Announcements</a></li>
          <li><a href="#">Meetings</a></li>
          <li><a href="#">Users</a></li>
          <li><a href="#">Admins</a></li>
          <li><a href="#">Profile</a></li>
        </ul>
      </div>

      <div className="sidebar-footer">
        <p>&copy; Ralph Kahkedjian 2025</p>
      </div>
    </div>
  )
}
