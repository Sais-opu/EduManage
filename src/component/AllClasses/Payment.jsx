import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Payment = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams(); // Get the ID from the route
    const navigate = useNavigate();
    const [classDetails, setClassDetails] = useState(null); // State for class details
    const [loading, setLoading] = useState(false);

    // Fetch class details on component mount
    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await fetch(`https://edumanage-server-nine.vercel.app/courses/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch class details.');
                }
                const data = await response.json();
                setClassDetails(data);
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchClassDetails();
    }, [id]);

    if (!classDetails) {
        return <div>Loading class details...</div>;
    }

    const { price, name, title, image } = classDetails;
    const email = user?.email;

    const handlePayment = async () => {
        setLoading(true);

        try {
            // Process payment
            const paymentResponse = await fetch('http://localhost:5000/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ classId: id, username: name, email, amount: price }),
            });

            if (!paymentResponse.ok) {
                throw new Error('Payment failed.');
            }

            const enrollmentResponse = await fetch('http://localhost:5000/enrolled', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ classId: id, username: name, email, title, image }),
            });

            if (!enrollmentResponse.ok) {
                throw new Error('Enrollment failed.');
            }

            navigate('/dashboard/my-enrollclasses');
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white text-black shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
            <p className="mb-4">Proceed to make payment for your class enrollment.</p>
            <div className="flex-1">
                <img src={image} alt={title} className="w-full h-64 object-cover rounded-lg" />
            </div>
            <p className="mb-4"><strong>Course:</strong> {title}</p>
            <p className="mb-4"><strong>Teacher:</strong> {name}</p>
            <p className="mb-4"><strong>Your Email:</strong> {email}</p>
            <p className="mb-4"><strong>Amount:</strong> ${price}</p>
            <button
                onClick={handlePayment}
                disabled={loading}
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none transition duration-300"
            >
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
        </div>
    );
};

export default Payment;
