//import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function ViewApps() {
  const storedMechanicId = localStorage.getItem('mid');
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate()
  
  const handleClick = (appointment_id) => {
    
    // Navigate to the Followups component
    navigate(`/follow-up/${appointment_id}`);
  };

  useEffect(() => {
    console.log('storedmechanicid',storedMechanicId)
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5004/appointments/mechanic/${storedMechanicId}`);
        setAppointments(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppointments();
  }, [storedMechanicId]);

  const ChangeDate = (date) => {
    //Get the datee
    var newdate = date.toString();

    const finalDate = newdate.split("T")
    //Split based on t
    return finalDate[0];
  }

  return (
    <div>
      <div>
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
      <h2>View Appointments</h2>
      <div className="view-appointments-grid">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="appointment-card">
            <div>User: {appointment.user_id}</div>
            <div>Mechanic: {appointment.mechanic_id}</div>
            <div>Date: {ChangeDate(appointment.appointment_date)}</div>
            <div>Make: {appointment.vehicle_make}</div>
            <div>Model: {appointment.vehicle_model}</div>
            <div>Description: {appointment.vehicle_description}</div>
            <div>
              <button onClick={() => handleClick(appointment.id)}>
                Update Progress
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewApps;
