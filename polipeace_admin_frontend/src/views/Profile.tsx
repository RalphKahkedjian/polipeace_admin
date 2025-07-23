import '../styles/Profile.css'
import { useStateContext } from '../contexts/contextProvider';
import axiosClient from '../Services/axiosClient';

export default function Profile() {
  const { user, email, age, id, setToken } = useStateContext();

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you no longer want to be an admin of Polipeace and delete your account?")) {
      axiosClient.delete(`/Admin/${id}`)
        .then(() => {
          alert("Your account has been deleted.");
          setToken(null);
        })
        .catch((err) => {
          console.error("Failed to delete admin:", err);
          alert("Failed to delete your account.");
        });
    }
  };

  return (
    <div className="profile-container">
      <h2 className='mt-2 text-start fw-normal'>{user}'s Profile</h2>
      <div className="profile-info">
        <div className="form-row">
          <label className='text-white'>ID</label>
          <input type="text" value={id} disabled />
        </div>

        <div className="form-row two-columns">
          <div>
            <label className='text-white'>Email</label>
            <input type="email" value={email} disabled />
          </div>
          <div>
            <label className='text-white'>Name</label>
            <input type="text" value={user} disabled />
          </div>
        </div>

        <div className="form-row">
          <label className='text-white'>Age</label>
          <input type="number" value={age} disabled />
        </div>

        <div className='d-flex button-group'>
          <button className="profile-btn" onClick={() => handleDelete(id)}>
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
}
