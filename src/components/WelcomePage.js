import React from 'react';
import { Link } from 'react-router-dom';


export default function WelcomePage() {
  return (
    <ul>
    <div className="container-fluid d-flex justify-content-center align-items-center" >
        <Link className="btn btn-outline-dark" to="/register">Registration</Link>
    </div>
    <div className="container-fluid d-flex justify-content-center align-items-center" >
        <Link className="btn btn-outline-dark" to="/login">Login</Link>
    </div>
</ul>
  )
}
