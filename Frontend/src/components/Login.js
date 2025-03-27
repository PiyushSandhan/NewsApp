import React, { useState } from 'react';
import '../Style/Login.css'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate=useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
   const [errorMessage, setErrorMessage] = useState('');
   const validateForm = () => {
    let errorMessages = [];

    // Regex patterns
    const phonePattern = /^\+?[1-9]\d{1,14}$/; // E.164 format
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // 6 to 20 chars, at least one numeric digit, one uppercase and one lowercase letter

   
    if (!phonePattern.test(phoneNumber) && errorMessages.length === 0) {
        errorMessages.push("Phone number should match international E.164 format.");
    }

    if (!passwordPattern.test(password) && errorMessages.length === 0) {
        errorMessages.push("Password must be 6-20 characters long, include at least one upper, one lower case letter, and one numeric digit.");
    }

    if (errorMessages.length > 0) {
        setErrorMessage(errorMessages.join(' '));
        return false;
    }

    setErrorMessage('');
    return true;
}

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return; 
  
    try {
      const response = await fetch("http://localhost:4000/api/v0/user/login", {
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
        setErrorMessage(data.message);
        throw new Error(data.message || 'Network response was not ok');
        
      }
      localStorage.setItem('token', data.token);
      localStorage.setItem('id', data.id);
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
    <div className="container " id='LoginContainer' style={{ background: "radial-gradient(circle,rgb(199, 219, 230),rgb(209, 233, 245))", height:"600px", width:"600px"}} >
      
      <form onSubmit={handleSubmit} >
      <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" fill="currentColor" className="bi bi-person-bounding-box" id="Icon" viewBox="0 0 16 16">
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
        <div className='container'>
                             {errorMessage && <div className="alert alert-danger mt-4" style={{color:"red",fontSize:"13px", height: '50px',
                        width: '94%',marginLeft: '2%'}}>{errorMessage}</div>}
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