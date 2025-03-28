import React, { useState, useEffect } from 'react';
import '../Style/Registration.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function UpdateProfile() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch user data on mount
    useEffect(() => {
        const decode=jwtDecode(localStorage.getItem('token')); // Assuming 'userId' is the key used

        if (decode.id) {
            const fetchUserDetails = async () => {
                try {
                    const response = await fetch(`http://localhost:4000/api/v0/user/${decode.id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch user details');
                    }
                    const data = await response.json();
                    setUsername(data.username);
                    setPhoneNumber(data.phoneNumber);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                    setErrorMessage('Failed to load user details.');
                }
            };
    
            fetchUserDetails();
        } else {
            setErrorMessage('User ID not found in local storage.');
        }
    }, []);
    

    const validateForm = () => {
        let errorMessages = [];

        const usernamePattern = /^[a-zA-Z0-9_]{3,}[a-zA-Z]+[0-9]*$/;
        const phonePattern = /^\+?[1-9]\d{1,14}$/;
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        if (!usernamePattern.test(username)) {
            errorMessages.push("Username should be alphanumeric, start with a letter, and be at least 3 characters long.");
        }

        if (!phonePattern.test(phoneNumber)) {
            errorMessages.push("Phone number should match the international E.164 format.");
        }

        if (password && !passwordPattern.test(password)) {
            errorMessages.push("Password must be 6-20 characters long, include at least one upper, one lower case letter, and one numeric digit.");
        }

        if (errorMessages.length > 0) {
            setErrorMessage(errorMessages.join(' '));
            return false;
        }

        setErrorMessage('');
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        const decode=jwtDecode(localStorage.getItem('token'));
        try {
            const response = await fetch('http://localhost:4000/api/v0/user/update', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    'id': decode.id, // Assuming 'id' is the key used
                },
                body: JSON.stringify({
                    username,
                    phoneNumber,
                    password
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                setErrorMessage(data.message || 'An error occurred while updating.');
                return;
            }

            navigate('/');  // Redirect to profile page after update
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred while updating.');
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
                <h2 className="Registration">Update Profile</h2>
                <div
                    className="container"
                    id="RegistrationContainer"
                    style={{
                        background: 'radial-gradient(circle, rgb(199, 219, 230), rgb(209, 233, 245))',
                        height: '600px',
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
                                New Password (optional)
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                            />
                        </div>

                        <div className='container'>
                            {errorMessage && (
                                <div className="alert alert-danger mt-4" style={{ color: "red", fontSize: "13px", height: '50px', width: '94%', marginLeft: '2%' }}>
                                    {errorMessage}
                                </div>
                            )}
                        </div>

                        <button type="submit" className="btn btn-dark mx-auto" id="Button">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateProfile;
