import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export default function NavBar() {
  const navigate = useNavigate();

  async function handleLogout(event) {
    event.preventDefault();
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
    try {
      await axios.get("http://localhost:8080/api/users/logout");
      navigate('/'); 
    } catch (error) {
      console.error(error);
      alert(error.message);
    } }

}
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <h2>Stock Alarms</h2>
            <button className="btn btn-primary" onClick={handleLogout}>Logout</button> 
          </div>
        </nav> 
    </div>
  )
}
