import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';


const TeacherRequest = () => {
    const [requests, setRequests] = useState([]);

    // Fetch all teacher requests
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('https://edumanage-server-nine.vercel.app/teaching-requests');
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching teacher requests:', error);
            }
        };
        fetchRequests();
    }, []);

    const handleApprove = async (id, email) => {
        try {
            
            await axios.put(`https://edumanage-server-nine.vercel.app/teaching-requests/${id}`, { status: 'approved' });

            await axios.put(`https://edumanage-server-nine.vercel.app/users/${email}`, { userRole: 'Teacher' });

            setRequests((prev) =>
                prev.map((req) =>
                    req._id === id ? { ...req, status: 'approved' } : req
                )
            );
            toast.success('Congrates for teacher!', {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        } catch (error) {
            console.error('Error approving request:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.put(`https://edumanage-server-nine.vercel.app/teaching-requests/${id}`, { status: 'rejected' });

            setRequests((prev) =>
                prev.map((req) =>
                    req._id === id ? { ...req, status: 'rejected' } : req
                )
            );
            toast.success('Rejected! please try next time.', {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Teacher Requests</h1>
            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Image</th>
                        <th className="border px-4 py-2">Experience</th>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Category</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request) => (
                        <tr key={request._id}>
                            <td className="border px-4 py-2">{request.name}</td>
                            <td className="border px-4 py-2">
                                <img src={request.photoURL} alt={request.name} className="h-12 w-12 rounded-full" />
                            </td>
                            <td className="border px-4 py-2">{request.experience}</td>
                            <td className="border px-4 py-2">{request.title}</td>
                            <td className="border px-4 py-2">{request.category}</td>
                            <td className="border px-4 py-2">{request.status}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleApprove(request._id, request.email)}
                                    disabled={request.status === 'approved' || request.status === 'rejected'}
                                    className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleReject(request._id)}
                                    disabled={request.status === 'rejected'}
                                    className="bg-red-500 text-white px-4 py-2 rounded ml-2 disabled:bg-gray-300"
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeacherRequest;
