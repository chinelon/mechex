import React, { useState, useEffect } from 'react';

function TrackProg() {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    /*fetch('/progress') // replace with your server route to retrieve progress data
      .then(response => response.json())
      .then(data => setProgressData(data))
      .catch(error => console.log(error));*/
  }, []);

  // render progress data
  return (
    <div>
      <h2>Progress Tracking</h2>
      <ul>
        {progressData.map(progress => (
          <li key={progress.id}>
            Appointment ID: {progress.appointment_id}<br />
            Status: {progress.status}<br />
            Notes: {progress.description}
          </li>
        ))}
      </ul>
    </div>

  );
}

export default TrackProg;
