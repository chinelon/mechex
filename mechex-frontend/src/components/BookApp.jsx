
import React, { useState } from 'react';

function BookApp() {
  const [user, setUser] = useState('');
  const [mechanic, setMechanic] = useState('');
  const [date, setDate] = useState('');
  const [appointment_date, setAppointment_Date] = useState('');
  const [vehicle_make, setVehicle_Make] = useState('');
  const [vehicle_model, setVehicle_Model] = useState('');
  const [vehicle_year, setVehicle_Year] = useState('');
  const [vehicle_description, setVehicle_Description] = useState('');

  const handleUserChange = (event) => {
    setUser(event.target.value);
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

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Code to submit form data to the server and create an appointment
  };

  return (
    <div>
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
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
