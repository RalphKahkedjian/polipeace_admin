import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { Admin } from "../models/Admin";



export default function Admins() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getAdmins = () => {
    axiosClient.get('/Admin/Admins')
      .then(({ data }) => {
        setAdmins(data.admins);
      })
      .catch((err) => {
        console.error("Failed to fetch admins:", err);
      });
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const filteredAdmins = admins.filter((admin) => {
    admin.username.toLowerCase().includes(searchTerm.trim().toLowerCase())
  });

  return (
    <div style={{ marginTop: '70px' }}>
      <input
        type="text"
        placeholder="🔍 Search an admin..."
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
          </tr>
        </thead>
        <tbody>
          {filteredAdmins.length > 0 ? (
            filteredAdmins.map((admin) => (
              <tr key={admin.id} style={{ backgroundColor: 'white' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{admin.id}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{admin.username}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{admin.email}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{admin.age}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ padding: '15px', textAlign: 'center' }}>
                ❌ No admins found...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
