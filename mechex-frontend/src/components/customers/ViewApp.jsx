import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewApp() {
  const storedUserId = localStorage.getItem('id');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    console.log(storedUserId)
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

  const ChangeDate = (date) => {
    //Get the datee
    var newdate = date.toString();

    const finalDate = newdate.split("T")    
    //Split based on t
    return finalDate[0];
  }

  return (
    <div>
      <h2>View Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Mechanic</th>
            <th>Date</th>
            <th>Make</th>
            <th>Model</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.user_id}</td>
              <td>{appointment.mechanic_id}</td>
              <td>{ChangeDate(appointment.appointment_date)}</td>
              <td>{appointment.vehicle_make}</td>
              <td>{appointment.vehicle_model}</td>
              <td>{appointment.vehicle_description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewApp;
