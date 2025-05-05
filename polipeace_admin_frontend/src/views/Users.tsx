import { useEffect, useState } from "react";
import axiosClient from "../Services/axiosClient";
import { User } from "../models/User";
import UserForm from "../components/Forms/userForm";


export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [showForm, setShowForm] = useState(false)

  const handleClick = ()=> {
    setShowForm(true)
  }


  const getUsers = () => {
    axiosClient.get('/User/Users')
      .then(({ data }) => {
        setUsers(data.users);
        console.log(data.users.party_affiliation)
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
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Sex</th>
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
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.sex}</td>
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
      <div style={{
        position:'fixed',
        bottom:'20px',
        display:'flex',
        gap:'10px'
      }}>
        <button style={{
          width:'130px',
          height:'45px',
          backgroundColor:'#4B1F3E',
          color:'white',
          borderRadius:'6px',
          boxShadow:'5px 6px 7px #4B1F3E',
          border:'.5px solid white'
        }}
        onClick={handleClick}
        >
          Add User
        </button>
        <button style={{
          width:'130px',
          height:'45px',
          backgroundColor:'#4B1F3E',
          color:'white',
          borderRadius:'6px',
          boxShadow:'5px 6px 7px #4B1F3E',
          border:'.5px solid white'
        }}
        >
          Delete User
        </button>
      </div>
      
      {showForm &&  (
        <div style={{position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)'}}>
          <UserForm />
        </div>
      )}
    </div>
  );
}
