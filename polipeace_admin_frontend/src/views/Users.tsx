import { useEffect, useState } from "react";
import axiosClient from "../Services/axiosClient";
import { User } from "../models/User";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';


export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigate = useNavigate();

  const getUsers = () => {
    axiosClient.get('/User/Users')
      .then(({ data }) => {
        setUsers(data.users);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
      });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete User")) {
      axiosClient.delete(`/User/${id}`)
        .then(() => {
          setUsers((prev) => prev.filter((user) => user.id !== id));
        })
        .catch((err) => {
          console.error("Failed to delete user:", err);
          alert("Error deleting user");
        });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = (users ?? []).filter((user) =>
    user.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div style={{ marginTop: '70px' }}>
      <input
        type="text"
        placeholder="Search a user..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '98%',
          height: '3em',
          borderRadius: '5px',
          paddingLeft: '10px',
          fontSize: '16px',
          outline: 'none',
          border: '1px solid #ccc'
        }}
      />

      <table style={{ width: '98%', borderCollapse: 'collapse', marginTop: '15px' }}>
        <thead style={{ backgroundColor: '#642C4B', color: 'white' }}>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Party Affiliation</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Age</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Sex</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id} style={{ backgroundColor: 'white' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.id}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.party_affiliation}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.age}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.sex}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
<i
  className="bi bi-trash"
  style={{
    cursor: 'pointer',
    color: '#482653',
    fontSize: '20px'
  }}
  onClick={() => user.id !== undefined && handleDelete(user.id)}
  title="Delete Admin"
/>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} style={{ padding: '15px', textAlign: 'center' }}>
                ❌ No users found...
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: 'flex',
        gap: '10px'
      }}>
        <button style={{
          width: '55px',
          height: '55px',
          backgroundColor: '#4B1F3E',
          color: 'white',
          borderRadius: '50%',
          boxShadow: '5px 6px 7px #4B1F3E',
          paddingTop: '7px',
          fontSize: '1.7em'
        }}
          onClick={() => navigate('/users/new')}
        >
          +
        </button>
      </div>
    </div>
  );
}
