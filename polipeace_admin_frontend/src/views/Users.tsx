import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { User } from "../models/User";


export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getUsers = () => {
    axiosClient.get('/User/Users')
      .then(({ data }) => {
        setUsers(data.users);
        console.log(data.users.party_affilation)
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.filter((user) => 
    user.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );
  

  return (
    <div style={{ marginTop: '70px' }}>
      <input
        type="text"
        placeholder="🔍 Search a user..."
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
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Age</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Party Affiliation</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id} style={{ backgroundColor: 'white' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.id}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.age}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.party_affiliation}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ padding: '15px', textAlign: 'center' }}>
                ❌ No users found...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
