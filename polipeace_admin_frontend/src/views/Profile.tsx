import './Profile.css';
import { useState, useRef } from 'react';
import { useStateContext } from '../contexts/contextProvider';

export default function Profile() {
  const [profilePic, setProfilePic] = useState("/Images/profile.jpg");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {user, email, age, id} = useStateContext()

  const handleProfileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  
  return (
    <div className="profile-container">
      <div className="profile-info">
        <div className='d-flex' style={{
          gap:'30px'
        }}>
        <div className='profile-picture'>
          hi
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
