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

    const navigateNextMechanic = () => {
        setCurrentMechanicIndex((prevIndex) => (prevIndex + 1) % mechanics.length);
    };

    const navigatePreviousMechanic = () => {
        setCurrentMechanicIndex((prevIndex) =>
            prevIndex === 0 ? mechanics.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {


        const fetchReviews = async () => {
            const mechanicId = mechanics[currentMechanicIndex].id
            console.log(mechanicId)
            if (mechanics.length > 0) {
                try {
                    const response = await axios.get(`http://localhost:5005/reviews/mechanics/${mechanicId}`);
                    setReviews(response.data);
                } catch (error) {
                    console.log(error);
                    console.log('not working')
                }
            }
        };

        fetchReviews();
    }, [mechanicId, mechanics]);


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
                    <div key={mechanics[currentMechanicIndex].id} className="appointment-card">
                        <div>{mechanics[currentMechanicIndex].name}</div>
                        <div>{mechanics[currentMechanicIndex].phone}</div>
                        <div>{mechanics[currentMechanicIndex].email}</div>
                        <div>{mechanics[currentMechanicIndex].address}</div>
                        <div>{mechanics[currentMechanicIndex].city}</div>
                        <div className="review-section">
                            <h3>Reviews:</h3>
                            <ul>
                                {reviews.map((review) => (
                                    <li key={review.id}>
                                        <strong>{review.name}:</strong> {review.review}
                                    </li>
                                ))}
                            </ul>
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

                    <div className="navigation-arrows">
                        <div className="arrow left" onClick={navigatePreviousMechanic}>
                            &lt;
                        </div>
                        <div className="arrow right" onClick={navigateNextMechanic}>
                            &gt;
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewMech;
