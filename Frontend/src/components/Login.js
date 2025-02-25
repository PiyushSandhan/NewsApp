import React, { useState } from 'react';
import '../Style/Login.css'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate=useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Phone Number:', phoneNumber);
    console.log('Password:', password);
  
    
  
    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          password: password
        })
      });
       const data=await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Network response was not ok');
      }
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <div style={{ background:"linear-gradient(to top,rgb(255, 255, 255),rgb(238, 235, 235))", minHeight: '100vh'}}>
        <Navbar />
    <h2 className="Login" >Login</h2>
    <div className="container " id='LoginContainer' style={{ background: "radial-gradient(circle,rgb(199, 219, 230),rgb(209, 233, 245))", height:"500px", width:"600px"}} >
      
      <form onSubmit={handleSubmit} >
      <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" fill="currentColor" class="bi bi-person-bounding-box" id="Icon" viewBox="0 0 16 16">
  <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5"/>
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
</svg>
        <div className="Phone" >
          <label htmlFor="phoneNumber" className="form-label ">Phone Number</label>
          <input
            type="String"
            className="form-control"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
          
          />
        </div>
        <div className="Password">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
         
          />
        </div>
        <button type="submit" className="btn btn-dark mx-auto" id='Button'>Submit</button>
      </form>
      <div className="text-center">
        <p>Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
    </div>
    </>
  );
}

export default Login;