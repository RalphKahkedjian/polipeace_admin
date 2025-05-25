import './Profile.css';
import { useStateContext } from '../contexts/contextProvider';

export default function Profile() {
  
  const {user, email, age, id, profilePic} = useStateContext()
  debugger
  console.log("profilePic:", profilePic);

  
  return (
    <div className="profile-container">
      <div className="profile-info">
        <div className='d-flex' style={{
          gap:'30px'
        }}>
        <div className='profile-picture'>
          <img src={profilePic} alt="Profile"/>
        </div>
        <div className='mt-5' style={{fontStyle:'italic'}}>
          A description of who is the admin
        </div>
        </div>
        <div className="form-row">
          <label>ID</label>
          <input type="text" value={id} disabled />
        </div>

        <div className="form-row two-columns">
          <div>
            <label>Email</label>
            <input type="email" value={email} disabled />
          </div>
          <div>
            <label>Name</label>
            <input type="text" value={user} disabled />
          </div>
        </div>

        <div className="form-row">
          <label>Age</label>
          <input type="number" value={age} disabled />
        </div>

        <div className='d-flex' style={{gap:'20px'}}>
        <button className="delete-btn mt-2" style={{ backgroundColor: '#642C4B', width: '180px' }}>
          Delete Profile
        </button>
        <button className="delete-btn mt-2" style={{ backgroundColor: '#642C4B', width: '180px' }}>
          Edit Profile
        </button>
        </div>
      </div>
    </div>
  );
}
