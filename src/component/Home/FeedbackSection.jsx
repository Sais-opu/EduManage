import React, { useEffect, useState } from 'react';

const FeedbackSection = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Fetch feedback data from the server
        const fetchFeedbacks = async () => {
            try {
                const response = await fetch('http://localhost:5000/feedback');
                const data = await response.json();
                setFeedbacks(data);
            } catch (error) {
                console.error('Error fetching feedback:', error);
            }
        };

        fetchFeedbacks();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + feedbacks.length) % feedbacks.length);
    };

    const handleAddFeedback = () => {
        // Logic to add feedback (e.g., open a modal for submitting feedback)
        console.log('Add Feedback button clicked');
    };

    return (
        <div className="feedback-section bg-gray-100 py-8">
            <h2 className="text-3xl font-semibold text-center mb-6">Teacher Feedback</h2>
            <div className="max-w-4xl mx-auto">
                {feedbacks.length > 0 ? (
                    <div className="carousel-container relative overflow-hidden">
                        <div
                            className="flex transition-transform ease-in-out duration-500"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {feedbacks.map((feedback, index) => (
                                <div key={index} className="carousel-item flex-shrink-0 w-full p-4">
                                    <div className="flex flex-col items-center text-center">
                                        <img
                                            src={feedback.image}
                                            alt={feedback.name}
                                            className="w-24 h-24 rounded-full object-cover mb-4"
                                        />
                                        <h3 className="text-xl font-bold">{feedback.name}</h3>
                                        <p className="text-sm text-gray-700 mb-2">Class Title: {feedback.classTitle}</p>
                                        <p className="text-gray-700 italic">"{feedback.text}"</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Carousel navigation */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
                        >
                            &#8592;
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
                        >
                            &#8594;
                        </button>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No feedback available</p>
                )}
            </div>
            <div className="text-center mt-6">
                <button onClick={handleAddFeedback} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Add Feedback
                </button>
            </div>
        </div>
    );
};

export default FeedbackSection;
