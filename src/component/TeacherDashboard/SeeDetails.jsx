import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeeDetails = ({ classId, user }) => {
    const [classData, setClassData] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [submissionCount, setSubmissionCount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [newAssignment, setNewAssignment] = useState({
        title: '',
        deadline: '',
        description: '',
        name: user?.displayName || '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchClassData = async () => {
            try {

                const enrollmentResponse = await axios.get(`https://edumanage-server-nine.vercel.app/courses/${classId}/enrollment`);
                setClassData({
                    totalEnrollment: enrollmentResponse.data.totalEnrollment,
                });


                const assignmentsResponse = await axios.get(`https://edumanage-server-nine.vercel.app/assignments/${classId}`);
                setAssignments(assignmentsResponse.data.assignments);


                const submissionResponse = await axios.get(`https://edumanage-server-nine.vercel.app/assignments/${classId}/submissions`);
                setSubmissionCount(submissionResponse.data.totalSubmissions);
            } catch (err) {
                setError('Failed to fetch data. Please try again later.');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };


        fetchClassData();
    }, [classId]);

    const handleAddAssignment = () => {
        if (!newAssignment.title || !newAssignment.deadline || !newAssignment.description) {
            alert('Please fill in all fields');
            return;
        }

        axios
            .post('https://edumanage-server-nine.vercel.app/assignments', {
                topic: newAssignment.title,
                deadline: newAssignment.deadline,
                description: newAssignment.description,
                name: newAssignment.name,
                classId,
            })
            .then((response) => {
                setAssignments((prev) => [...prev, response.data]);
                setNewAssignment({ title: '', deadline: '', description: '', name: user?.displayName });
                setShowModal(false);
                alert('Assignment added successfully!');
            })
            .catch((error) => {
                console.error('Error adding assignment:', error);
                alert('Failed to add assignment. Please try again.');
            });
    };

    return (
        <div className="p-6">
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : error ? (
                <div className="text-red-500 text-center">{error}</div>
            ) : (
                <>
                    {/* Class Details */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold">{classData?.title || 'Class Title'}</h1>
                        <p className="text-gray-600">{classData?.description || 'Class Description'}</p>
                        <p className="text-gray-800 font-medium">
                            Total Submissions: {submissionCount}
                        </p>
                    </div>

                    {/* Assignments List */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-4">Assignments</h2>
                        {assignments.length > 0 ? (
                            <ul className="space-y-4">
                                {assignments.map((assignment) => (
                                    <li
                                        key={assignment.id}
                                        className="p-4 border rounded-lg shadow-sm"
                                    >
                                        <h3 className="font-semibold text-lg">{assignment.topic}</h3>
                                        <p className="text-gray-600">{assignment.description}</p>
                                        <p className="text-gray-500">
                                            Deadline: {new Date(assignment.deadline).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-800">
                                            Submissions: {assignment.submissions || 0}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No assignments added yet.</p>
                        )}
                    </div>

                    {/* Add Assignment Button */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Add Assignment
                    </button>

                    {/* Modal for Adding Assignment */}
                    {showModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                <h3 className="text-xl font-semibold mb-4">Add Assignment</h3>
                                <div className="mb-4">
                                    <label className="block mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={newAssignment.name}
                                        readOnly
                                        className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={newAssignment.title}
                                        onChange={(e) =>
                                            setNewAssignment((prev) => ({
                                                ...prev,
                                                title: e.target.value,
                                            }))
                                        }
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1">Deadline</label>
                                    <input
                                        type="date"
                                        value={newAssignment.deadline}
                                        onChange={(e) =>
                                            setNewAssignment((prev) => ({
                                                ...prev,
                                                deadline: e.target.value,
                                            }))
                                        }
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1">Description</label>
                                    <textarea
                                        value={newAssignment.description}
                                        onChange={(e) =>
                                            setNewAssignment((prev) => ({
                                                ...prev,
                                                description: e.target.value,
                                            }))
                                        }
                                        className="w-full p-2 border rounded-md"
                                        rows="4"
                                    ></textarea>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-gray-300 rounded-md"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddAssignment}
                                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                                    >
                                        Add Assignment
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SeeDetails;
