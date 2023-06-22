import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewMech() {
    const [mechanics, setMechanics] = useState([]);
    const [currentMechanicIndex, setCurrentMechanicIndex] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [name, setName] = useState('')
    const [newReview, setNewReview] = useState('');



    useEffect(() => {
        const fetchMechanics = async () => {
            try {
                const response = await axios.get('http://localhost:5003/mechanics/');
                setMechanics(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMechanics();
    }, []);


    useEffect(() => {
        const fetchReviews = async () => {
            if (mechanics.length > 0) {
                try {
                    const mechanic_id = mechanics[currentMechanicIndex]?.id
                    console.log(mechanic_id)
                    if (mechanic_id) {
                        const response = await axios.get(`http://localhost:5005/reviews/mechanics/${mechanic_id}`);
                        setReviews(response.data);
                    } else
                        console.log('no mechanicid')
                } catch (error) {
                    console.log(error);
                    console.log('not working')
                }
            }
        };

        fetchReviews();
    }, [currentMechanicIndex, mechanics]);

    const navigateNextMechanic = () => {
        setCurrentMechanicIndex((prevIndex) => (prevIndex + 1) % mechanics.length);
    };

    const navigatePreviousMechanic = () => {
        setCurrentMechanicIndex((prevIndex) =>
            prevIndex === 0 ? mechanics.length - 1 : prevIndex - 1
        );
    };
    const createReview = async (mechanicId) => {
        try {
            const response = await axios.post('http://localhost:5005/reviews', {
                mechanicId,
                name,
                review: newReview,
            });
            setName('');
            setNewReview('');
            // You can handle the success response as needed
            console.log(response.data);
        } catch (error) {
            console.log(error);
            // You can handle the error response as needed
        }
    };

    return (
        <div>
            <h2>View Mechanics</h2>
            {mechanics.length > 0 && (
                <div className="mechanic-window">
                    <div className="arrow left" onClick={navigatePreviousMechanic}>
                        &lt;
                    </div>
                    <div key={mechanics[currentMechanicIndex].id} className="appointments-card">
                        <div className='mechanics'>
                            <div>{mechanics[currentMechanicIndex].name}</div>
                            <div>{mechanics[currentMechanicIndex].phone}</div>
                            <div>{mechanics[currentMechanicIndex].email}</div>
                            <div>{mechanics[currentMechanicIndex].address}</div>
                            <div>{mechanics[currentMechanicIndex].city}</div>
                        </div>
                        <div className="review-section">
                            <h3>Reviews:</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Review</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reviews.map((review) => (
                                        <tr key={review.id}>
                                            <td>{review.name}</td>
                                            <td>{review.review}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div>
                                <form>
                                    <div >
                                        <label htmlFor="name">    Name</label>
                                        <input
                                            type="name"
                                            id="name"
                                            placeholder='chinelo'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div >
                                        <label htmlFor="reviews">    Review</label>
                                        <input
                                            type="review"
                                            id="review"
                                            placeholder='review'
                                            value={newReview}
                                            onChange={(e) => setNewReview(e.target.value)}
                                        />
                                    </div>
                                </form>

                                <button onClick={() => createReview(mechanics[currentMechanicIndex].id)}>
                                    Submit Review
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="arrow right" onClick={navigateNextMechanic}>
                        &gt;
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewMech;
