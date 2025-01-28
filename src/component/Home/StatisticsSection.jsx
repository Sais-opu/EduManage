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
                const response = await fetch("https://edumanage-server-nine.vercel.app/stat");
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Error fetching statistics:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div><h1 className="text-5xl bg-[#adff2f] text-black text-center font-semibold">Statistics</h1>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-6 bg-[#adff2f]">
                {/* Left Side - Cards */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-1/2 ">
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
                        src="https://i.ibb.co.com/jW0Y2vK/images-q-tbn-ANd9-Gc-SN0ue-J4-YHQ0dh5-Bb-A4c-Vq3-Jwxurh-Hhx-Iqx-Q-s.jpg"
                        alt="Educational Illustration"
                        className="rounded-xl shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default StatisticsSection;
