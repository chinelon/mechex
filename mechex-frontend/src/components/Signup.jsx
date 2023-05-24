//this react component will be used to sign up customers
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Perform signup logic here
            // You can use the username, password, email, and phone values
            // Send a POST request to your backend API endpoint

            const response = await axios.post('http://localhost:5002/users/signup', {
                username,
                password,
                email,
                phone_no: phone,
            });

            // Handle the response from the backend as needed
            console.log(response.data);

            // Reset form fields after successful signup
            setUsername('');
            setPassword('');
            setEmail('');
            setPhone('');

            navigate('/dashboard');
        } catch (error) {
            // Handle any errors that occurred during the signup process
            console.error(error);
        }



    };


    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        placeholder='chinelon'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    <label htmlFor="phone_no">Phone Number: </label>
                    <input
                        type="integer"
                        id="phone_no"
                        placeholder='09063330222'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
}

export default Signup;
