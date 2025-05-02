import './Profile.css';
import CoverImage from '../assets/images/ProfileCover.png';
import { useState, useRef } from 'react';
import { useStateContext } from '../contexts/contextProvider';

export default function Profile() {
  const [profilePic, setProfilePic] = useState("/Images/profile.jpg");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Implement email , id, name, age from ContextProvider file
  //const {user} = useStateContext()

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
      <div className="cover-photo">
        <img src={CoverImage} alt="Cover" className="cover-img" />
        <div className="profile-pic-wrapper" onClick={handleProfileClick}>
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      <div className="profile-info">
        <div className="form-row">
          <label>ID</label>
          <input type="text" value="ID123456" disabled />
        </div>

        <div className="form-row two-columns">
          <div>
            <label>Email</label>
            <input type="email" value="john@example.com" disabled />
          </div>
          <div>
            <label>Name</label>
            <input type="text" value="John Doe" disabled />
          </div>
        </div>

        <div className="form-row">
          <label>Age</label>
          <input type="number" value="25" disabled />
        </div>

        <button className="delete-btn mt-2" style={{ backgroundColor: '#642C4B', width: '180px' }}>
          Delete Profile
        </button>
      </div>
    </div>
  );
}
