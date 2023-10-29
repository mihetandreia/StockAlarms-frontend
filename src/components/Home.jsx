import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AlarmPage from './AlarmPage';
import NavBar from './NavBar';


function Home() {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try{
        const result = await axios.get("http://localhost:8080/api/users/whoAmI")
        setUser(result.data);
        console.log(result.data);
        console.log(user);
        console.log(user.id);
    } catch (error) {
    if (error.response) {
        console.error('Eroare:', error.message);
    }
  } 
};
return (user.id ?  <div> <NavBar /> <AlarmPage user={user} /> </div> : <div>Loading...</div> ) ;

}

export default Home;
