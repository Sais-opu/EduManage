import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';

const MyClass = () => {
    const { user } = useContext(AuthContext);
    const [classes, setClasses] = useState([]);
    const [filteredClasses, setFilteredClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [updateData, setUpdateData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:5000/courses/all')
            .then((response) => {
                setClasses(response.data);
                // Filter classes based on the logged-in teacher's displayName
                const myClasses = response.data.filter(
                    (course) => course.name === user.displayName
                );
                setFilteredClasses(myClasses);
            })
            .catch((error) => console.error('Error fetching courses:', error));
    }, [user.displayName]);

    // Open update modal and set selected class
    const handleUpdate = (course) => {
        setSelectedClass(course);
        setUpdateData({
            title: course.title,
            price: course.price,
            short_description: course.short_description,
        });
        setShowModal(true);
    };

    // Submit updated class data
    const handleUpdateSubmit = async () => {
        if (!selectedClass) {
            alert('No class selected for update.');
            return;
        }
        setLoading(true);
        try {
            await axios.put(
                `http://localhost:5000/courses/${selectedClass._id}/update`,
                updateData
            );
            setFilteredClasses((prev) =>
                prev.map((course) =>
                    course._id === selectedClass._id
                        ? { ...course, ...updateData }
                        : course
                )
            );
            setShowModal(false);
            setSelectedClass(null);
            alert('Updated successfully!');
        } catch (error) {
            console.error('Error updating class:', error);
            alert('Failed to update the class. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Delete a class
    const handleDelete = async (courseId) => {
        if (window.confirm('Are you sure you want to delete this class?')) {
            try {
                await axios.delete(`http://localhost:5000/courses/${courseId}/delete`);
                setFilteredClasses((prev) =>
                    prev.filter((course) => course._id !== courseId)
                );
                alert('Class deleted successfully!');
            } catch (error) {
                console.error('Error deleting class:', error);
                alert('Failed to delete the class. Please try again.');
            }
        }
    };

    // Navigate to class details
    const handleSeeDetails = (courseId) => {
        window.location.href = `/dashboard/my-class/${courseId}`;
    };

    return (
        <div>
            <h2>Your Classes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClasses.map((course) => (
                    <div
                        key={course._id}
                        className="p-4 border rounded-lg shadow-md flex flex-col items-start"
                    >
                        <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-lg font-semibold">{course.title}</h3>
                        <p>
                            <strong>Name:</strong> {course.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {course.email}
                        </p>
                        <p>
                            <strong>Price:</strong> ${course.price}
                        </p>
                        <p className="mb-2">
                            <strong>Description:</strong>{' '}
                            {course.short_description && course.short_description.length > 50
                                ? course.short_description.substring(0, 50) + '...'
                                : course.short_description || 'No description available'}
                        </p>
                        <p>
                            <strong>Status:</strong> {course.status}
                        </p>
                        <div className="flex items-center gap-2 mt-4">
                            <button
                                onClick={() => handleUpdate(course)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(course._id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => handleSeeDetails(course._id)}
                                disabled={course.status !== 'approved'}
                                className={`px-4 py-2 ${
                                    course.status === 'approved'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-400 text-gray-700'
                                } rounded-md`}
                            >
                                See Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Update Modal */}
            {showModal && selectedClass && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white text-black p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Update Class</h3>
                        <div className="mb-4">
                            <label className="block mb-1">Title</label>
                            <input
                                type="text"
                                value={updateData.title}
                                onChange={(e) =>
                                    setUpdateData((prev) => ({
                                        ...prev,
                                        title: e.target.value,
                                    }))
                                }
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Price</label>
                            <input
                                type="number"
                                value={updateData.price}
                                onChange={(e) =>
                                    setUpdateData((prev) => ({
                                        ...prev,
                                        price: e.target.value,
                                    }))
                                }
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Description</label>
                            <textarea
                                value={updateData.short_description}
                                onChange={(e) =>
                                    setUpdateData((prev) => ({
                                        ...prev,
                                        short_description: e.target.value,
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
                                onClick={handleUpdateSubmit}
                                disabled={loading}
                                className={`px-4 py-2 ${
                                    loading ? 'bg-gray-400' : 'bg-green-500'
                                } text-white rounded-md`}
                            >
                                {loading ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyClass;
