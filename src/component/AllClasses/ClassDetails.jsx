import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ClassDetails = () => {
    const { id } = useParams();
    const [classDetails, setClassDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                console.log('Fetching details for class ID:', id); // Log the class ID
                const response = await fetch(`https://edumanage-server-nine.vercel.app/courses/${id}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch class details: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Class details fetched successfully:', data); // Log the fetched data
                setClassDetails(data);
            } catch (error) {
                console.error('Error fetching class details:', error.message); // Log the error message
            }
        };

        fetchClassDetails();
    }, [id]);

    useEffect(() => {
        console.log('classDetails state updated:', classDetails);
    }, [classDetails]);

    const handlePay = () => {
        console.log('Redirecting to payment for class ID:', id);
        navigate(`/payment/${id}`);
    };

    if (!classDetails) {
        console.log('Loading class details...');
        return <div className="text-center text-xl text-gray-500">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col md:flex-row space-y-6 md:space-y-0 gap-4">
            <div className="flex-1">
                <img
                    src={classDetails.image}
                    alt={classDetails.title}
                    className="w-full h-64 object-cover rounded-lg"
                />
            </div>
            <div className="flex-1 space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">{classDetails.title}</h2>
                <p className="text-lg text-gray-700"><strong>Teacher:</strong> {classDetails.name}</p>
                <p className="text-lg text-gray-700"><strong>Price:</strong> ${classDetails.price}</p>
                <p className="text-lg text-gray-700"><strong>Description:</strong> {classDetails.short_description}</p>
                <p className="text-lg text-gray-700"><strong>Total Enrolment:</strong> {classDetails.total_enrolment}</p>
                
                <button
                    onClick={handlePay}
                    className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 focus:outline-none transition duration-300"
                >
                    Pay for Class
                </button>
            </div>
        </div>
    );
};

export default ClassDetails;
