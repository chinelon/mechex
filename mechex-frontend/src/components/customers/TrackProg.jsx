import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TrackProg() {
  const [appointments, setAppointments] = useState([]);
  const storedUserId = localStorage.getItem('id');

  useEffect(() => {
    // Fetch the appointments data from the backend API
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5004/appointments/user/${storedUserId}');
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
      <table>
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Description</th>
            <th>Status</th>
            <th>Mechanic's Notes</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.description}</td>
              <td>{appointment.status}</td>
              <td>{appointment.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrackProg;
