import React, { useState } from "react";
import  { useNavigate } from 'react-router-dom'
import "../Signin.css"; // Import the CSS file

const Signup = (props) => {

  const [credentials, setCredentials] = useState({name:"",email:"", password:"", cpassword:""})
  let navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log(credentials);
    if (
      credentials.name === "" || 
      credentials.email === "" || 
      credentials.password === ""
    ) {
      props.showAlert("All fields required..!","danger")
      return
    }
    
    if (credentials.password !== credentials.cpassword) {
      props.showAlert("password and confirm password are note same","danger");
    }
    else{
         const {name, email, password} = credentials;     // destructuring :
         const response = await fetch("http://localhost:5000/api/auth/createUser", {
             method: "POST",
             
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({name, email, password}),
         });
         const json = await response.json();
         console.log(json);
         if(json.success){
             // save the auth token and redirect
             localStorage.setItem('token', json.authToken);
             props.showAlert("Account created Successfully","success");
             navigate("/login");
         }
         else{
          let alrt = json.errors.map(e=>e.msg).join(', ')
          props.showAlert(alrt,"danger");
    }
  }
}


  return (
    <form>
      <h2 className="">Sign Up</h2>
      <label htmlFor="name" >
        Name:
        <input
          type="text"
          // id="name"
          // name="name"
          // value={credentials.name}
          onChange={e=> setCredentials({...credentials, name: e.target.value})}
        />
      </label>
      <br />
      <label htmlFor="email">
        Email:
        <input
          type="email"
          // id="email"
          // name="email"
          // value ={credentials.email}
          onChange={e=> setCredentials({...credentials, email: e.target.value})}
        />
      </label>
      <br />
      <label htmlFor="password">
        Password:
        <input
          type="password"
          id="password" 
          name="password"
          onChange={e=> setCredentials({...credentials, password: e.target.value})}
          minLength={5} required
        />
      </label>
      <br />
      <label htmlFor="cpassword" >
        Confirm Password:
        <input
          type="password"
          onChange={e=> setCredentials({...credentials, cpassword: e.target.value})}
          minLength={5} required
        />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </form>
  )
}

export default Signup;
