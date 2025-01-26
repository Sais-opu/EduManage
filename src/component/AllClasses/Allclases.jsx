import React, { useEffect, useState } from 'react';

const Allclases = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch('http://localhost:5000/courses'); 
                const data = await response.json();
                setClasses(data.filter(cls => cls.status === "approved"));
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };

        fetchClasses();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {classes.map((cls) => (
                <div key={cls._id} className="card bg-white shadow-lg rounded-lg p-4">
                    <img src={cls.image} alt={cls.title} className="w-full h-48 object-cover rounded-lg" />
                    <h3 className="text-lg text-neutral-900 font-bold mt-4">{cls.title}</h3>
                    <p className="text-gray-600">Posted by: <span className="font-medium">{cls.name}</span></p>
                    <p className="text-gray-600 mt-2"><strong>Price:</strong> ${cls.price}</p>
                    <p className="text-gray-600 mt-2">{cls.short_description}</p>
                    <p className="text-gray-600 mt-2"><strong>Total Enrolments:</strong> {cls.total_enrolment}</p>
                    <button 
                        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                        onClick={() => handleEnroll(cls._id)}>
                        Enroll
                    </button>
                </div>
            ))}
        </div>
    );
};



export default Allclases;
