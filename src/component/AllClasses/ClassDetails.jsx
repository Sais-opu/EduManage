import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ClassDetails = () => {
    const { id } = useParams();
    const [classDetails, setClassDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/courses/${id}`);
                const data = await response.json();
                setClassDetails(data);
            } catch (error) {
                console.error("Error fetching class details:", error);
            }
        };

        fetchClassDetails();
    }, [id]);

    const handlePay = () => {
        navigate(`/payment/${id}`);
    };

    if (!classDetails) return <p>Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <img src={classDetails.image} alt={classDetails.title} className="w-full h-64 object-cover rounded-lg" />
            <h2 className="text-2xl font-bold mt-4">{classDetails.title}</h2>
            <p className="text-gray-600 mt-2"><strong>Teacher:</strong> {classDetails.name}</p>
            <p className="text-gray-600 mt-2"><strong>Price:</strong> ${classDetails.price}</p>
            <p className="text-gray-600 mt-2">{classDetails.description}</p>
            <button
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                onClick={handlePay}>
                Pay
            </button>
        </div>
    );
};

export default ClassDetails;
