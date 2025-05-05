import { useState } from 'react';
import axios from 'axios';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/User/Register', form);
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />

        <select name="sex" value={form.sex} onChange={handleChange}>
          <option value="m">Male</option>
          <option value="f">Female</option>
        </select>

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

        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
