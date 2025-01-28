import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
// import logo from '../../assets/icon/travel-bag.png'
import { AuthContext } from '../Provider/AuthProvider';


const SideNav = () => {
    const { user } = useContext(AuthContext); // Get user from context
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user?.email) {
                try {
                    const response = await fetch(`https://edumanage-server-nine.vercel.app/users/role?email=${user.email}`, {
                        headers: { 'Authorization': `Bearer ${user.token}` },
                    });
                    if (!response.ok) {
                        console.error('Failed to fetch user role:', response.statusText);
                        return;
                    }
                    const data = await response.json();
                    setUserRole(data.role);
                } catch (error) {
                    console.error('Error fetching user role:', error);
                }
            }
        };
        
        fetchUserRole();
    }, [user]);


    if (!userRole) {
        return <p>Loading...</p>;
    }

    const sidebarStyle = {
        width: '250px',
        backgroundColor: '#adff2f',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        height: '100vh',
    };

    const sidebarMenuStyle = {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
    };

    const sidebarItemStyle = {
        marginBottom: '15px',
    };

    const linkStyle = {
        display: 'block',
        width: '100%',
        padding: '10px 15px',
        backgroundColor: '#ffffff',
        border: '1px solid #ddd',
        borderRadius: '5px',
        textAlign: 'left',
        fontSize: '16px',
        color: '#333',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    };

    const activeLinkStyle = {
        backgroundColor: '#007bff',
        color: '#ffffff',
        borderColor: '#007bff',
    };

    const dashboardContainerStyle = {
        display: 'flex',
    };

    return (
        <div style={dashboardContainerStyle} className="h-72">
            {/* Sidebar */}
            <aside style={sidebarStyle}>

                <ul style={sidebarMenuStyle}>
                    <li style={sidebarItemStyle}>
                        <NavLink
                            to="/dashboard/myprofile"
                            style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                        >
                            My Profile
                        </NavLink>
                    </li>

                    {userRole === 'Student' && (
                        <>
                            <li style={sidebarItemStyle}>
                                <NavLink
                                    to="/dashboard/my-enrollclasses"
                                    style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                                >
                                    My Enrol Class
                                </NavLink>
                            </li>

                        </>
                    )}

                    {userRole === 'Teacher' && (
                        <>
                            <li style={sidebarItemStyle}>
                                <NavLink
                                    to='/dashboard/teacher/addclasses'
                                    style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                                >
                                    Add Classes
                                </NavLink>
                            </li>
                            <li style={sidebarItemStyle}>
                                <NavLink
                                    to="/dashboard/teacher/myclasses"
                                    style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                                >
                                    My Class
                                </NavLink>
                            </li>
                            
                        </>
                    )}

                    {userRole === 'Admin' && (
                        <>
                            <li style={sidebarItemStyle}>
                                <NavLink
                                    to="/dashboard/admin/teacherrequest"
                                    style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                                >
                                    Teacher Request
                                </NavLink>
                            </li>
                            <li style={sidebarItemStyle}>
                                <NavLink
                                    to="/dashboard/users"
                                    style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                                >
                                    Users
                                </NavLink>
                            </li>
                            <li style={sidebarItemStyle}>
                                <NavLink
                                    to="/dashboard/admin/allclasses"
                                    style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
                                >
                                    All Classes
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </aside>
        </div>
    );
};

export default SideNav;
