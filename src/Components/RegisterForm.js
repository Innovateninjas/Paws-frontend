import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:8000/register/', { username, password });
            console.log('Registration successful');
            // Here you would typically redirect the user to the login page
        } catch (error) {
            if (error.response && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('An error occurred while registering.');
            }
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Register</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default RegisterForm;