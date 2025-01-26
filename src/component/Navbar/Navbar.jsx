import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider"
const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/users/role?email=${user.email}`)
                .then((response) => {
                    console.log(`Status: ${response.status}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("API Response Data:", data);  // Log the entire response
                    setUserRole(data.role);  // This should set the role if it's returned
                })
                .catch((error) => {
                    console.error("Error fetching user role:", error);
                });

        }
    }, [user]);




    const handleLogout = async () => {
        try {
            await signOutUser();
            console.log("User logged out successfully");
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error.message);
            console("Failed to log out. Please try again.");
        }
    };

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded ${isActive ? " bg-green-700 text-white" : "bg-transparent text-black"}`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li className="mx-1">
                <NavLink
                    to="/allclasses"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded ${isActive ? " bg-green-700 text-white" : "bg-transparent text-black"}`
                    }
                >
                    All Classes
                </NavLink>
            </li>
            <li className="mx-1">
                <NavLink
                    to="/teachon"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded ${isActive ? " bg-green-700 text-white" : "bg-transparent text-black"}`
                    }
                >
                    Teach On
                </NavLink>
            </li>

        </>
    );

    const dashboardLink = () => {
        switch (userRole) {
            case "Student":
                return "/dashboard/student";
            case "Teacher":
                return "/dashboard/teacher";
            case "Admin":
                return "/dashboard/admin";
            default:
                return null;
        }
    };

    return (
        <div>
            {user && user.displayName && (
                <div className="bg-[#FEFAE0] text-center py-2">
                    <span className="text-sm font-medium text-[#333533]">
                        Welcome,
                        {user.displayName}
                    </span>
                </div>
            )}
            <div className="navbar bg-[#adff2f]" >
                <div className="navbar-start">
                    <div className="dropdown">
                        <button tabIndex={0} className="btn btn-ghost lg:hidden text-[#3F0113]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </button>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow"
                            style={{ backgroundColor: "#FEFAE0", color: "#333533" }}
                        >
                            {links}
                        </ul>
                    </div>

                    <NavLink
                        to="/"
                        className="btn btn-ghost normal-case md:text-xl font-bold text-purple-700"
                    >
                        EduManage
                    </NavLink>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{links}</ul>
                </div>
                <div className="navbar-end gap-4 flex items-center">
                    {user && user.photoURL && (
                        <div className="relative">
                            <img
                                src={user.photoURL}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full cursor-pointer"
                                onClick={toggleDropdown}
                            />
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                                    <div className="px-4 py-2 text-sm text-gray-700">
                                        <p className="font-bold">{user.displayName}</p>
                                        <p>{user.email}</p>
                                    </div>
                                    <hr />
                                    {dashboardLink() && (
                                        <NavLink
                                            to={dashboardLink()}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Dashboard
                                        </NavLink>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {!user && (
                        <div className="flex gap-4">
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    `btn ${isActive ? "bg-green-700 text-[#ffffff]" : "btn-outline border-green-bg-green-700 text-black"}`
                                }
                            >
                                Sign Up
                            </NavLink>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `btn ${isActive ? "bg-green-700 text-[#3F0113]" : "btn-outline border-green-bg-green-700 text-black"}`
                                }
                            >
                                Log In
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
