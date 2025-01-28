import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const TeachOn = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: user?.displayName || "",
        email: user?.email || "",
        experience: "beginner",
        title: "",
        category: "Web Development",
        photoURL: user?.photoURL || "",
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading state during submission
        try {
            const response = await fetch("https://edumanage-server-nine.vercel.app/teaching-requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Request submitted for review.");
                setStatus("pending");
            } else {
                alert("Failed to submit request.");
            }
        } catch (error) {
            console.error("Error submitting request:", error);
        } finally {
            setLoading(false); // Hide loading state
        }
    };

    return (
        <div className="min-h-screen bg-[#adff2f] text-black flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 space-y-4"
            >
                <h1 className="text-2xl font-bold text-center text-black">
                    Apply to Teach
                </h1>
                <div className="space-y-2">
                    <label className="block text-black font-semibold">Name:</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={formData.name}
                    
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-black font-semibold">Email:</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={formData.email}
                        readOnly
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-black font-semibold">Photo:</label>
                    <input
                        type=""
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={formData.photoURL}
                        
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-black font-semibold">Experience:</label>
                    <select
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={formData.experience}
                        onChange={(e) =>
                            setFormData({ ...formData, experience: e.target.value })
                        }
                    >
                        <option value="beginner">Beginner</option>
                        <option value="mid-level">Mid-Level</option>
                        <option value="experienced">Experienced</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="block text-black font-semibold">Title:</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="Enter your title"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-black font-semibold">Category:</label>
                    <select
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={formData.category}
                        onChange={(e) =>
                            setFormData({ ...formData, category: e.target.value })
                        }
                    >
                        <option value="Web Development">Web Development</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Content Writing">Content Writing</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className={`w-full px-4 py-2 text-white font-bold rounded-lg ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                        }`}
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit for Review"}
                </button>
                {status && (
                    <p className="text-center text-green-600 font-medium mt-4">
                        Request status: {status}
                    </p>
                )}
            </form>
        </div>
    );
};

export default TeachOn;
