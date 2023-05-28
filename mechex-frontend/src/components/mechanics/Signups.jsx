//this react component will be used to signup mechanics
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Signups() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUserType] = useState('mechanic');

  const navigate = useNavigate()



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform signup logic here
      // You can use the username, password, email, and phone values
      // Send a POST request to your backend API endpoint

      const response = await axios.post('http://localhost:5003/mechanics/signups', {
        name,
        phone,
        email,
        address,
        city,
        password,
        user_type: usertype
      });

      // Handle the response from the backend as needed
      console.log(response.data);

      // Reset form fields after successful signup
      setName('');
      setPhone('');
      setEmail('');
      setAddress('');
      setCity('');
      setPassword('');
      setUserType('');

      navigate('/dashboards');
    } catch (error) {
      // Handle any errors that occurred during the signup process
      console.error(error);
    }



  };

  return (
    <div>
      <h2>Welcome to our Mechanic Party!</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
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
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder='Chinelo Nwobbi'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number: </label>
          <input
            type="text"
            id="phone"
            placeholder='09063330222'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          <label htmlFor="address">Street Address:</label>
          <input
            type="address"
            id="address"
            placeholder='12, Brimsdale road'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="city"
            id="city"
            placeholder='Ikeja'
            value={city}
            onChange={(e) => setCity(e.target.value)}
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


        <button type="submit">Sign up</button>
      </form>
    </div>
  )
}

export default Signups;