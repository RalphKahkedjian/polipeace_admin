import './Profile.css';
import { useStateContext } from '../contexts/contextProvider';

export default function Profile() {
  const { user, email, age, id } = useStateContext();

  return (
    <div className="profile-container">
      <div className="profile-info">
        <div className='d-flex' style={{ gap: '30px' }}>
          <div className='mt-5 profile-description'>
            Add a description of you by pressing the button below.
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

        <div className='d-flex button-group'>
          <button className="profile-btn">Delete Profile</button>
          <button className="profile-btn">Add Description</button>
        </div>
      </div>
    </div>
  );
}
