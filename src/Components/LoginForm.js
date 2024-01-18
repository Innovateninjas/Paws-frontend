import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/login/', { username, password });
            const token = response.data.token;
            console.log('Login successful, token:', token);
            // Here you would typically save the token to local storage or context and redirect the user
        } catch (error) {
            if (error.response && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('An error occurred while logging in.');
            }
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default LoginForm;