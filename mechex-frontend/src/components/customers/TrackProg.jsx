import React, { useState, useEffect } from 'react';
import { Link  } from 'react-router-dom';
import axios from 'axios';

function TrackProg() {
  const [appointments, setAppointments] = useState([]);
  const storedUserId = localStorage.getItem('id');

  useEffect(() => {
    // Fetch the appointments data from the backend API
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5004/appointments/user/${storedUserId}`);
        setAppointments(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppointments();
  }, [storedUserId]);

  return (
    <div>
    <h2>Track Progress</h2>
    <div className="track-progress-grid">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="progress-card">
          <div>Appointment ID: {appointment.id}</div>
          <div>Description: {appointment.vehicle_description}</div>
          <div>Status: {appointment.status}</div>
          <div>Mechanic's Notes: {appointment.notes}</div>
        </div>
      ))}
    </div>
  </div>
  );
}

export default TrackProg;
