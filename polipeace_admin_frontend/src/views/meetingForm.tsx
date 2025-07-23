import { useState } from 'react';
import '../components/Forms/userForm.css'
import { useNavigate } from 'react-router-dom';
import axiosClient from '../Services/axiosClient';

export default function MeetingForm() {
  const [form, setForm] = useState({
    name: '',
    location: '',
    status: 'pending',
    date: '',
    countdown: '',
    time: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await axiosClient.post('/Meeting/Add', form);
    setMessage(`Meeting (${response.data.details.name}) was successfully scheduled!`);
    setTimeout(() => {
      navigate('/meetings');
    }, 1000);
  } catch (error: any) {
    setMessage(error.response?.data?.message || 'Meeting scheduling failed');
  }
};

  return (
    <div className='User-form-container'>
      <h2>Meetings <span style={{ fontStyle: 'italic', fontSize: '.8em' }}>/ Schedule a Meeting</span></h2>
      <p className='mt-3 go-back-link' onClick={() => navigate('/meetings')}>➥ Go back</p>
      <ul style={{
        height: '.05em',
        width: '99%',
        backgroundColor: '#642C4B'
      }} />
      <form onSubmit={handleSubmit} className='user-form-design'>
        <label>Enter meeting name</label>
        <input type="text" name="name" placeholder="Meeting Name" value={form.name} onChange={handleChange} required />
        
        <label>Enter meeting location</label>
        <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        
        <label>Meeting status</label>
        <select name="status" value={form.status} onChange={handleChange} required>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <label>Enter meeting date</label>
        <input type="text" name="date" placeholder="Date" value={form.date} onChange={handleChange} required />
        
        <label>Enter meeting countdown</label>
        <input type="text" name="countdown" placeholder="Countdown" value={form.countdown} onChange={handleChange} />
        
        <label>Enter meeting time</label>
        <input type="text" name="time" placeholder="Time" value={form.time} onChange={handleChange} required />
        
        <button type="submit">Schedule Meeting</button>
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
