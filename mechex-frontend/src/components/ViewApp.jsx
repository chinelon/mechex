import React, { useState, useEffect } from 'react';

function ViewApp() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Code to fetch appointments data from the server
    // and update the appointments state
  }, []);

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
