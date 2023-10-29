import {  useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";


export default function Login() {
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    async function login(event) {
        event.preventDefault();
        try {
          await axios.post("http://localhost:8080/api/users/login", {
            email: email,
            password: password,
            }).then((res) => 
            {
                
                console.log(res.data);
             
             if (res.data.message === "Email not exits") 
             {
               alert("Email not exits");
             } 
             else if(res.data.message === "Login Successfully")
             { 
                alert("Login Successfully")
                navigate('/home');
             } 
              else 
             { 
                alert("Incorrect Email or Password");
             }
          }, fail => {
           console.error(fail);
  });
        }

 
         catch (err) {
          alert(err);
        }
      
      }

    return (
       <div>
          <div class="d-flex justify-content-between align-items-start">
             <h1 class="ml-5">Stock Alarms</h1>
          </div>
          <div className="container">
            <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

                <h2>Login</h2>
             <hr/>
            
 
        <form>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"  
            className="form-control" 
            id="email" 
            placeholder="Enter email"
            required
            value={email}
            onChange={(event) => {
            setEmail(event.target.value);
          }}
          
          />

        </div>

        <div className="form-group">
            <label>Password</label>
            <input 
                type="password"  
                className="form-control" 
                id="password" 
                placeholder="Enter password"
                required
                value={password}
                onChange={(event) => {
              setPassword(event.target.value);
            }}
            
            />
        </div>
        <ul className="list-unstyled">
            <li>
            <div className="container-fluid d-flex justify-content-center align-items-center mt-2">
                <button type="submit" className="btn btn-primary" onClick={login}>
                    Sign in
                </button>
            </div>
            </li>
            <li>
                <div className="container-fluid d-flex justify-content-center align-items-center mt-2">
                    <p className="mr-2 mb-0">Don't have an account?</p>
                    <Link className="btn btn-outline-dark" to="/register">
                        Sign up
                    </Link>
                </div>
            </li>
            </ul>

        </form>

            </div>
            </div>
            </div>
            </div>

     
    );
  }
  
  