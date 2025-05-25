import { useState } from 'react';
import axios from 'axios';
import '../components/Forms/userForm.css'
import { useNavigate } from 'react-router-dom';

export default function AdminForm() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    age: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/Admin/Register', form);
      setMessage(`Admin ( ${response.data.admin.name} ) was successfully added !`);
      setTimeout(() => {
        navigate('/admins');
      }, 1000);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className='User-form-container'>
      <h2>Users <span style={{fontStyle:'italic', fontSize:'.8em'}}>/ Add Admin</span></h2>
      <p className='mt-3 go-back-link' onClick={()=> navigate('/users')}>➥ Go back</p>
      <ul style={{
        height:'.05em',
        width:'99%',
        backgroundColor:'#642C4B'
      }} />
      <form onSubmit={handleSubmit} className='user-form-design'>
        <label>Enter admin's name</label>
        <input type="text" name="username" placeholder="Name" value={form.username} onChange={handleChange} required />
        <label>Enter admin's email</label>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <label>Enter admin's age</label>
        <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} required />
        <label>Enter admin's password</label>
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Register Admin</button>
      </form>
      <div className='alert alert-success'>
        {message && <p><span className='fw-bold'>Success:</span> {message}</p>}
      </div>
    </div>
  );
}
