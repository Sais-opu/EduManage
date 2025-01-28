import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminAllClasses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Fetch all courses from the backend
        axios.get('http://localhost:5000/courses/all')
            .then(response => setCourses(response.data))
            .catch(error => console.error('Error fetching courses:', error));
    }, []);

    const handleApprove = async (courseId) => {
        try {
            // Update course status to "approved"
            await axios.patch(`http://localhost:5000/courses/${courseId}/approve`);
            setCourses(prevCourses => 
                prevCourses.map(course => 
                    course._id === courseId ? { ...course, status: 'approved' } : course
                )
            );
        } catch (error) {
            console.error('Error approving course:', error);
        }
    };

    const handleReject = async (courseId) => {
        try {
            // Update course status to "rejected"
            await axios.patch(`http://localhost:5000/courses/${courseId}/reject`);
            setCourses(prevCourses => 
                prevCourses.map(course => 
                    course._id === courseId ? { ...course, status: 'rejected' } : course
                )
            );
        } catch (error) {
            console.error('Error rejecting course:', error);
        }
    };

    const handleProgress = (courseId) => {
        alert(`Progress of course with ID ${courseId}`); // Replace with actual progress logic
    };

    return (
        <div>
            <h2 className='font-bold text-5xl text-center mb-2'>All Classes</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Email</th>
                        <th>Description</th>
                        <th>Approved</th>
                        <th>Reject</th>
                        <th>Progress</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course._id} style={{ borderBottom: '1px solid #ccc' }}>
                            <td>{course.title}</td>
                            <td><img src={course.image} alt={course.title} width="100" /></td>
                            <td className='pr-1'>{course.email}</td>
                            <td>{course.short_description ? course.short_description.substring(0, 50) + '...' : 'No description available'}</td>
                            <td>
                                {course.status === 'pending' ? (
                                    <button 
                                        onClick={() => handleApprove(course._id)}
                                        style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}
                                    >
                                        Approve
                                    </button>
                                ) : (
                                    <span>{course.status}</span>
                                )}
                            </td>
                            <td>
                                {course.status === 'pending' && (
                                    <button 
                                        onClick={() => handleReject(course._id)}
                                        style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}
                                    >
                                        Reject
                                    </button>
                                )}
                            </td>
                            <td>
                                <button 
                                    disabled={course.status !== 'approved'} 
                                    onClick={() => handleProgress(course._id)}
                                    style={{
                                        padding: '5px 10px', 
                                        backgroundColor: course.status === 'approved' ? '#4CAF50' : '#ccc', 
                                        color: 'white', 
                                        cursor: course.status === 'approved' ? 'pointer' : 'not-allowed', 
                                        border: 'none'
                                    }}
                                >
                                    Progress
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminAllClasses;
