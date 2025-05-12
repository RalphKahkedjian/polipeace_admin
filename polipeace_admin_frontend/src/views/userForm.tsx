import { useState } from 'react';
import axios from 'axios';
import '../components/Forms/userForm.css'
import { useNavigate } from 'react-router-dom';

export default function UserForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
    sex: 'm',
    party_affiliation: 'none',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/User/Register', form);
      setMessage(`User ( ${response.data.user.name} ) was successfully added !`);
      setTimeout(() => {
        navigate('/users');
      }, 1000);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className='User-form-container'>
      <h2>Users <span style={{fontStyle:'italic', fontSize:'.8em'}}>/ Add User</span></h2>
      <p className='mt-3 go-back-link' onClick={()=> navigate('/users')}>➥ Go back</p>
      <ul style={{
        height:'.05em',
        width:'99%',
        backgroundColor:'#642C4B'
      }} />
      <form onSubmit={handleSubmit} className='user-form-design'>
        <label>Enter user's name</label>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <label>Enter user's email</label>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <label>Enter user's age</label>
        <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} required />
        <label>Enter user's password</label>
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <label>Enter user's sex</label>
        <select name="sex" value={form.sex} onChange={handleChange}>
          <option value="m">Male</option>
          <option value="f">Female</option>
        </select>
        <label>Enter user's Party Affiliation</label>
        <select name="party_affiliation" value={form.party_affiliation} onChange={handleChange}>
          <option value="none">None</option>
          <option value="lebanese forces">Lebanese Forces</option>
          <option value="free patriotic movement">Free Patriotic Movement</option>
          <option value="tashnag">Tashnag</option>
          <option value="kataeb">Kataeb</option>
          <option value="hezbollah">Hezbollah</option>
          <option value="amal movement">Amal Movement</option>
          <option value="marada movement">Marada Movement</option>
          <option value="future movement">Future Movement</option>
          <option value="progressive socialist party">Progressive Socialist Party</option>
        </select>

        <button type="submit">Register User</button>
      </form>
      <div className='alert alert-success'>
        {message && <p><span className='fw-bold'>Success:</span> {message}</p>}
      </div>
    </div>
  );
}
