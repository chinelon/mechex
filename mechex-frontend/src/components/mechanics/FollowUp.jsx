import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";

function FollowUp() {

    const [status, setStatus] = useState(0);
    const [notes, setNotes] = useState('');
    const [appointment, setAppointment] = useState('');
    const { appointment_id } = useParams();

    useEffect(() => {
        console.log('app id', appointment_id)
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


        try {

            const response = await axios.put(`http://localhost:5004/appointments/${appointment_id}`, {
                status,
                notes,
                appointment_id,
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


    return (
        <div className="form-columnss">
            <div><Link to="/dashboards">Back to Dashboard</Link></div>
            <h2>Enter Follow up Information</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="statuss">Status: </label>
                    <input
                        type="number"
                        id="status"
                        placeholder='80% completed'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="notes">Notes: </label>
                    <input
                        type="text"
                        id="notes"
                        placeholder='Please come back for further analysis in two weeks'
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>

                <button className="submits-button" type="submit">
                    Save
                </button>
            </form>
        </div>

    );
}

export default FollowUp;