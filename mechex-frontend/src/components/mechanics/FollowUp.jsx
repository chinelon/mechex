import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function FollowUp () {

    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post('http://localhost:5005/progress', {
                status,
                description,
                notes,
            });

            // Handle the response from the backend as needed
            console.log(response.data);

            // Reset form fields after successful signup
            setStatus('');
            setDescription('');
            setNotes('');
            
        } catch (error) {
            // Handle any errors that occurred during the signup process
            console.error(error);
        }
    };

    return(
        <div>
        <h2>Enter Follow up Information</h2>
        <form onSubmit={handleSubmit}>
        <div>
                <label htmlFor="status">Status:</label>
                <input
                    type="status"
                    id="status"
                    placeholder='80% completed'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input
                    type="description"
                    id="description"
                    placeholder='Oil Change'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="notes">Notes:</label>
                <input
                    type="notes"
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