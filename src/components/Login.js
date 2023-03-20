import React, { useState } from 'react'
import  { useNavigate } from 'react-router-dom'
import Oauth from './Oauth'
import { GoogleOAuthProvider } from '@react-oauth/google';
import '../LoginPage.css';

const Login = (props) => {

    const [credentials, setCredentials] = useState({email:"", password:""})
    let navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
      
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}), // it willd be easier by using desctructuring the usestate objects
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            // save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("Logged in Successfully","success");
            navigate("/");
        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form className="login-form"  onSubmit={handleSubmit}>

        <div className="login-field">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email"value={credentials.email} onChange={onChange}  required />
        </div>

        <div className="login-field">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password"value={credentials.password} onChange={onChange} required />
        </div>
        
        <button className="login-button my-3">Login</button>
        or
        <div className="my-3">
        <GoogleOAuthProvider ><Oauth /></GoogleOAuthProvider>
        </div>
      </form>
    </div>
  );
}

export default Login;
