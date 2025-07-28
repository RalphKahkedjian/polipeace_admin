import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../Services/axiosClient";

export default function VotesForm() {
 

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = ()=> {
    return window.alert("wait");
  }

  return (
    <div className='User-form-container'>
      <h2>Votes <span style={{ fontStyle: 'italic', fontSize: '.8em' }}>/ Create a Voting pole</span></h2>
      <p className='mt-3 go-back-link' onClick={() => navigate('/votes')}>➥ Go back</p>
      <ul style={{
        height: '.05em',
        width: '99%',
        backgroundColor: '#642C4B'
      }} />
      <form onSubmit={handleSubmit} className='user-form-design'>
        <label>Enter Announcement subject</label>
        <input type="text" name="subject" placeholder="subject"required />
        
        <label>Enter Announcement description</label>
        <input type="text" name="description" placeholder="description" required />
        
        <button type="submit">Post Announcement</button>
      </form>

      <div
        className="alert alert-dark"
        style={{ backgroundColor: '#4B1F3E', color: 'white' }}
      >
        {message && <p><span className='fw-bold'>Success:</span> {message}</p>}
      </div>
    </div>
  );
}
