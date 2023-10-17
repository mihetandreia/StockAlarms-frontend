import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [users, setUsers] = useState([]);  

    useEffect(() => {
      loadUsers();
  }, []);

  const loadUsers = async () => {
      try {
          const result = await axios.get("http://localhost:8080/users")
          setUsers(result.data);
      } catch (error) {
      if (error.response) {
          console.log('Răspuns cu eroare:', error.response.data);
      } else if (error.request) {
          console.log('Eroare de rețea:', error.message);
      } else {
          console.error('Eroare:', error.message);
      }
      }
  }

return (
    <div>
    <div className='container'>
        <div className='py-4'>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Email</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
    </tr>
  </thead>
  <tbody>
   {users.map((user, index) => (
    <tr>
        <th scope='row' key={index}>
            {index + 1}
        </th>
        <td>{user.email}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        
    </tr>
   ))}
  </tbody>
</table>
    </div>
    </div>
  </div>
  )

   
    
    
    

  
}
