//this react component will be used to sign up customers
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [usertype, setUserType] = useState('customer')
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
                user_type: usertype
            });

            // Handle the response from the backend as needed
            console.log(response.data);

            // Reset form fields after successful signup
            setUsername('');
            setPassword('');
            setEmail('');
            setPhone('');
            setUserType('');

            navigate('/dashboard');
        } catch (error) {
            // Handle any errors that occurred during the signup process
            console.error(error);
        }



    };


    return (
        <div className='signup'>
            <div className='main-form'>
                <h2>Welcome to the MechEx Family!</h2>
                <form onSubmit={handleSubmit}>
                    <div className='search-form'>
                        <label htmlFor="usertype">What kind of user are you?:</label>
                        <select
                            id="usertype"
                            value={usertype}
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <option value="customer">Customer</option>
                            <option value="mechanic">Mechanic</option>
                        </select>
                    </div>
                    <div className='formcolumns'>
                        <div className='formcolumn'>
                            <div>
                                <label htmlFor="username"></label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder=' Username: chinelon'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone_no"> </label>
                                <input
                                    type="integer"
                                    id="phone_no"
                                    placeholder='Phone Number: 09063330222'
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='formcolumn'>
                            <div>
                                <label htmlFor="email"></label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder='Email: chinelo@yahoo.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password"></label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            
                        </div>

                    </div>
                    <div className='submitbutton'>
                        <button type="submit">Sign up</button>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default Signup;
