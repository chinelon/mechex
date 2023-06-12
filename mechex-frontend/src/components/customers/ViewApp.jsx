//import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      <div className="welcome">
                    <div>
                        <Link to="/booking">Ready for a New Appointment?</Link>
                    </div>
                    <div>
                        <Link to="/map">Mechanics Map</Link>
                    </div>
      </div>
        <h2>View Appointments</h2>
        <div className="appointments-grid">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <div>Appointment Date: {ChangeDate(appointment.appointment_date)}</div>
              <div>Vehicle Make: {appointment.vehicle_make}</div>
              <div>Vehicle Model: {appointment.vehicle_model}</div>
              <div>Description: {appointment.vehicle_description}</div>
            </div>
          ))}
        </div>
    </div>
  );
}

export default ViewApp;
