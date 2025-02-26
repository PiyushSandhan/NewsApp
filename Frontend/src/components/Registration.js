import React, { useState } from 'react';
import '../Style/Registration.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function Registration() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateForm = () => {
        let errorMessages = [];

        // Regex patterns
        const usernamePattern = /^[a-zA-Z0-9_]{3,}[a-zA-Z]+[0-9]*$/; // Alphanumeric with no spaces, min 3 chars
        const phonePattern = /^\+?[1-9]\d{1,14}$/; // E.164 format
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // 6 to 20 chars, at least one numeric digit, one uppercase and one lowercase letter

        if (!usernamePattern.test(username)) {
            errorMessages.push("Username should be alphanumeric, start with a letter, and at least 3 characters long.");
        }

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
      

        if (!validateForm()) return; // Stop submission if validation fails

        try {
            const response = await fetch('http://localhost:4000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    phoneNumber: phoneNumber,
                    password: password,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
            setErrorMessage(data.message || 'An error occurred during registration.');
            return;
            }

            navigate('/login');
        } catch (error) {
            console.error('Error:', error);
            errorMessage.push(error);
        }
    };

    return (
        <>
            <div
                style={{
                    background: 'linear-gradient(to top, rgb(255, 255, 255), rgb(238, 235, 235))',
                    minHeight: '100vh',
                }}
            >
                <Navbar />
                <h2 className="Registration">Registration</h2>
                <div
                    className="container"
                    id="RegistrationContainer"
                    style={{
                        background: 'radial-gradient(circle, rgb(199, 219, 230), rgb(209, 233, 245))',
                        height: '500px',
                        width: '600px',
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <div className="Username">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                required
                            />
                           
                        </div>

                        <div className="Phone">
                            <label htmlFor="phoneNumber" className="form-label">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter phone number"
                                required
                            />
                           
                        </div>

                        <div className="Password">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                required
                            />
                            <div className='container'>
                             {errorMessage && <div className="alert alert-danger mt-4" style={{color:"red",fontSize:"13px", height: '50px',
                        width: '94%',marginLeft: '2%'}}>{errorMessage}</div>}
                       </div>
                             
                        </div>

                        <button type="submit" className="btn btn-dark mx-auto" id="Button">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Registration;