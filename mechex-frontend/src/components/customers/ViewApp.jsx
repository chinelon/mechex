import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewApp() {
  const { userId } = useParams();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`/users/${userId}/appointments`);
        setAppointments(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppointments();
  }, [userId]);

  return (
    <div>
      <h2>View Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Mechanic</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.user}</td>
              <td>{appointment.mechanic}</td>
              <td>{appointment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewApp;
