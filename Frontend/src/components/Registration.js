import React, { useState } from 'react';
import '../Style/Registration.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function Registration() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Username:', username);
        console.log('Phone Number:', phoneNumber);
        console.log('Password:', password);

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
                throw new Error('Network response was not ok');
            }

            navigate('/login');
        } catch (error) {
            console.error('Error:', error);
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
