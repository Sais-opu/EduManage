import React, { useEffect, useState } from "react";

const StatisticsSection = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalClasses: 0,
        totalEnrollments: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch("http://localhost:5000/stat");
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Error fetching statistics:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-6 bg-gray-100">
            {/* Left Side - Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-1/2">
                {/* Total Users */}
                <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-800">Total Users</h2>
                    <p className="text-4xl font-bold text-purple-600 mt-2">
                        {stats.total_users}
                    </p>
                </div>

                {/* Total Classes */}
                <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-800">Total Classes</h2>
                    <p className="text-4xl font-bold text-blue-600 mt-2">
                        {stats.total_classes}
                    </p>
                </div>

                {/* Total Enrollments */}
                <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Total Enrollments
                    </h2>
                    <p className="text-4xl font-bold text-green-600 mt-2">
                        {stats.total_enrollment}
                    </p>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
                <img
                    src="https://i.ibb.co.com/VBf1Mj1/3d-icon-happy-student-using-laptop-for-online-education-wearing-headphones-and-sitting-at-desk-with.jpg"
                    alt="Educational Illustration"
                    className="rounded-xl shadow-lg"
                />
            </div>
        </div>
    );
};

export default StatisticsSection;
