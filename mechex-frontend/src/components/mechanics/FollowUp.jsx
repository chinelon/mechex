import React from "react";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

function FollowUp () {

    const [status, setStatus] = useState(0);
    const [notes, setNotes] = useState('');
    const [appointment, setAppointment] = useState('');
    const { appointment_id } = useParams();
    
    useEffect(() => {
        console.log(appointment_id)
        const fetchAppointmentDetails = async () => {
          try {
            const response = await axios.get(`http://localhost:5004/appointments/${appointment_id}`);
            setAppointment(response.data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchAppointmentDetails();
      }, [appointment_id]);
    
    const handleSubmit = async (e) => {
        
        e.preventDefault();

        if (!Number.isInteger(status)) {
            alert('Status must be a valid integer');
            return;
          }
        
        try {

            const response = await axios.put(`http://localhost:5004/appointments/${appointment_id}`, {
                status,
                notes,
            });

            // Handle the response from the backend as needed
            console.log(response.data);

            // Reset form fields after successful signup
            setStatus('');
            setNotes('');
            
            alert('follow up has been created')
        } catch (error) {
            // Handle any errors that occurred during the signup process
            console.error(error);
        }
    };

    if (!appointment_id) {
        return <p>Loading...</p>;
      }
    

    return(
        <div>
        <h2>Enter Follow up Information</h2>
        <form onSubmit={handleSubmit}>
        <div>
                <label htmlFor="status">Status:</label>
                <input
                    type="number"
                    id="status"
                    placeholder='80% completed'
                    value={status}
                    onChange={(e) => setStatus(parseInt(e.target.value))}
                />
            </div>
            <div>
                <label htmlFor="notes">Notes:</label>
                <input
                    type="text"
                    id="notes"
                    placeholder='Please come back for further analysis in two weeks'
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>
            
            <button type="submit">
                Save
            </button>
        </form>
    </div>

    );
}

export default FollowUp;