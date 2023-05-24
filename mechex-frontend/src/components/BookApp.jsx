
import React, { useState } from 'react';
import axios from 'axios';

function BookApp() {
  const [user, setUser] = useState('');
  const [mechanics, setMechanics] = useState([]);
  const [address, setAddress] = useState('');
  //const [date, setDate] = useState('');
  const [appointment_date, setAppointment_Date] = useState('');
  const [vehicle_make, setVehicle_Make] = useState('');
  const [vehicle_model, setVehicle_Model] = useState('');
  const [vehicle_year, setVehicle_Year] = useState('');
  const [vehicle_description, setVehicle_Description] = useState('');

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleDateChange = (event) => {
    setAppointment_Date(event.target.value);
  };
  
  const handleMakeChange = (event) => {
    setVehicle_Make(event.target.value);
  };

  const handleModelChange = (event) => {
    setVehicle_Model(event.target.value);
  };

  const handleYearChange = (event) => {
    setVehicle_Year(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setVehicle_Description(event.target.value);
  };

  //ghis code handles the search for mechanics 
  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/mechanics/${address}`);
      const mechanics = response.data;
      console.log(mechanics)
      setMechanics(mechanics);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Code to submit form data to the server and create an appointment
  };

  return (
    <div>
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        
        <div><input
          type="text"
          placeholder="Enter location"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
          <button onClick={handleSearch}>Search</button>

          {/* Render the mechanics' information */}
      {mechanics.map((mechanic) => (
        <div key={mechanic.id}>
          <p>Name: {mechanic.name}</p>
          <p>Address: {mechanic.address}</p>
          {/* Additional mechanic information */}
        </div>
      ))}
        </div>
        
        
        <div>
          <label htmlFor="date">Appointment Date: </label>
          <input type="date" id="appointment_date" value={appointment_date} placeholder='10/11/2033' onChange={handleDateChange} />
        </div>
        <div>
          <label htmlFor="vehicle_make">Vehicle Make: </label>
          <input type="text" id="vehicle_make" value={vehicle_make} placeholder='Toyota' onChange={handleMakeChange} />
        </div>
        <div>
          <label htmlFor="vehicle_model">Vehicle Model: </label>
          <input type="text" id="vehicle_model" value={vehicle_model} placeholder='Camry' onChange={handleModelChange} />
        </div>
        <div>
          <label htmlFor="vehicle_year">Vehicle Year: </label>
          <input type="text" id="vehicle_year" value={vehicle_year} placeholder='2003' onChange={handleYearChange} />
        </div>
        <div>
          <label htmlFor="vehicle_description">Vehicle Description: </label>
          <input type="text" id="vehicle_description" value={vehicle_description} placeholder='Oil change needed' onChange={handleDescriptionChange} />
        </div>
        <button type="submit" >Book Appointment </button>
      </form>
    </div>
  );
}

export default BookApp;
