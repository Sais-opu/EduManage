import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { Rating } from 'react-simple-star-rating';

const MyEnrollClassDetails = () => {
    const { cls } = useParams();
    const { user } = useContext(AuthContext);
    const [assignments, setAssignments] = useState([]);
    const [filteredAssignments, setFilteredAssignments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await fetch(`http://localhost:5000/assignments`);
                if (!response.ok) {
                    throw new Error('Failed to fetch assignments');
                }
                const data = await response.json();
                setAssignments(data); // Store all assignments
            } catch (error) {
                console.error('Error fetching assignments:', error.message);
            }
        };

        if (cls) {
            fetchAssignments();
        }
    }, [cls]);

    useEffect(() => {
        if (assignments.length > 0) {
            const filtered = assignments.filter(
                (assignment) => assignment.title === cls
            );
            setFilteredAssignments(filtered.length > 0 ? filtered : assignments);
        }
    }, [assignments, cls]);

    const handleSubmitAssignment = async (assignmentId) => {
        try {
            const response = await fetch('http://localhost:5000/submit-assignment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ assignmentId, email: user?.email }),
            });

            if (response.ok) {
                setFilteredAssignments((prev) =>
                    prev.map((assignment) =>
                        assignment._id === assignmentId
                            ? { ...assignment, submissionCount: assignment.submissionCount + 1 }
                            : assignment
                    )
                );
            } else {
                console.error('Failed to submit assignment');
            }
        } catch (error) {
            console.error('Error submitting assignment:', error.message);
        }
    };

    const handleEvaluation = async () => {
        try {
            const response = await fetch('http://localhost:5000/submit-feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rating,
                    comment,
                    email: user?.email,
                }),
            });

            if (response.ok) {
                setShowModal(false);
                console.log('Feedback submitted successfully');
            } else {
                console.error('Failed to submit feedback');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error.message);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Assignments</h1>
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2">Deadline</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAssignments.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center py-4">
                                No assignments available for this class.
                            </td>
                        </tr>
                    ) : (
                        filteredAssignments.map((assignment) => (
                            <tr key={assignment._id}>
                                <td className="border px-4 py-2">{assignment.title}</td>
                                <td className="border px-4 py-2">{assignment.description}</td>
                                <td className="border px-4 py-2">{assignment.deadline}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleSubmitAssignment(assignment._id)}
                                        className="bg-green-500 text-white py-1 px-4 rounded-lg"
                                    >
                                        Submit
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-6"
            >
                Teaching Evaluation Report
            </button>


            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal modal-open">
                        <div className="modal-box bg-white text-black p-6 w-96">
                            <h2 className="text-xl font-bold">Teaching Evaluation Report</h2>
                            <div>
                                <label className=" text-sm font-medium mb-2">Rating</label>
                                <div className="flex gap-2 items-center">
                                    <Rating onClick={setRating} ratingValue={rating} size={24} />
                                </div>
                            </div>


                            <div className="mt-4">
                                <label className="block text-sm font-medium mb-2">Comment</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full border rounded-lg p-2"
                                />
                            </div>
                            <div className="mt-6 flex justify-between">
                                <button
                                    onClick={handleEvaluation}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                                >
                                    Send
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyEnrollClassDetails;
