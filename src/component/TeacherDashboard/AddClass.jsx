import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../Provider/AuthProvider';

const AddClass = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [short_description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const {user}=useContext(AuthContext)
    const navigate = useNavigate(); 
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const classData = {
            title,
            price,
            short_description,
            image,
            email: user.email,
            name: user.displayName,
        };
    
        try {
            const response = await axios.post('http://localhost:5000/courses/add', classData);
            console.log(response.status); // Log the response status to confirm it's 201
            if (response.status === 201) {
                navigate('/dashboard/teacher/myclasses');
            }
        } catch (error) {
            console.error('Error adding class:', error);
        }
    };
    
    

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold text-center mb-4">Add New Class</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 text-black block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="text"
                        value={user.displayName}
                        readOnly
                        className="mt-1 text-black block w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="mt-1 text-black block w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="mt-1 text-black block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={short_description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="mt-1 text-black block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                        className="mt-1 text-black block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                    Add Class
                </button>
            </form>
        </div>
    );
};

export default AddClass;
