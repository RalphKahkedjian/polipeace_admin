import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../Services/axiosClient";

export default function MeetingForm() {
  const [form, setForm] = useState({
    subject: '',
    description: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await axiosClient.post('/Announcement/Post', form);
    setMessage(`Announcement (${response.data.announcement.subject}) was successfully posted!`);
    setTimeout(() => {
      navigate('/announcements');
    }, 1000);
  } catch (error: any) {
    setMessage(error.response?.data?.message || 'Announcement posting failed');
  }
};

  return (
    <div className='User-form-container'>
      <h2>Announcements <span style={{ fontStyle: 'italic', fontSize: '.8em' }}>/ Post an Announcement</span></h2>
      <p className='mt-3 go-back-link' onClick={() => navigate('/announcements')}>➥ Go back</p>
      <ul style={{
        height: '.05em',
        width: '99%',
        backgroundColor: '#642C4B'
      }} />
      <form onSubmit={handleSubmit} className='user-form-design'>
        <label>Enter Announcement subject</label>
        <input type="text" name="subject" placeholder="subject" value={form.subject} onChange={handleChange} required />
        
        <label>Enter Announcement description</label>
        <input type="text" name="description" placeholder="description" value={form.description} onChange={handleChange} required />
        
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
