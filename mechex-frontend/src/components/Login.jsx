//this will allow users and mechanics to log in
import React from "react";
import { useState, Link } from "react";
import { useNavigate } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('customer'); // Default user type is 'customer'
    const naigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send login request to the backend API
            const response = await axios.post('/login', {
                email,
                password,
                userType,
            });

            // Check if login was successful
            if (response.data.success) {
                // Redirect to the appropriate dashboard based on the selected user type
                if (userType === 'customer') {
                    naigate('/dashboard');
                } else if (userType === 'mechanic') {
                    naigate('/dashboards');
                }

                // Reset form fields after successful login
                setEmail('');
                setPassword('');
            } else {
                // Handle unsuccessful login
                console.log('Login failed');
            }
        } catch (error) {
            // Handle any errors that occurred during the login process
            console.error(error);
        }
    };



    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userType">User Type:</label>
                    <select
                        id="userType"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <option value="customer">Customer</option>
                        <option value="mechanic">Mechanic</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder='chinelo@yahoo.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder='******'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;