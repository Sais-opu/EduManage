import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const MyEnrolClass = () => {
    const { user } = useContext(AuthContext);
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEnrolledClasses = async () => {
            try {
                const response = await fetch(`https://edumanage-server-nine.vercel.app/enrolled?email=${user?.email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setEnrolledClasses(data);
            } catch (error) {
                console.error('Error fetching enrolled classes:', error.message);
            }
        };
    
        if (user?.email) {
            fetchEnrolledClasses();
        }
    }, [user]);
    

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Enrolled Classes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledClasses.map((cls) => (
                    <div key={cls._id} className="bg-white shadow-md rounded-lg p-4">
                        <img src={cls.image} alt={cls.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                        <h2 className="text-lg font-semibold text-black">{cls.title}</h2>
                        <p className="text-gray-600 mb-2">Teacher: {cls.username}</p>
                        <button
                        
                        onClick={() => navigate(`/dashboard/myenroll-class/${cls.title}`)} 
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                        Continue
                    </button>
                    
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyEnrolClass;
