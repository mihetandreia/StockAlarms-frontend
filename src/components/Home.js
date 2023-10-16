import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {

   
    
    return(
        <div className="container-fluid d-flex justify-content-center align-items-center" >
            <Link className="btn btn-outline-dark" to="/adduser">Registration</Link>
          </div>
    );
    

  
}
