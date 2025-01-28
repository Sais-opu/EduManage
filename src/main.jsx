import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './component/Home/Home'
import Root from './Root'
import Register from './component/Register/Register'
import AuthProvider from './component/Provider/AuthProvider'
import Allclases from './component/AllClasses/Allclases'
import TeachOn from './component/TeachOn/TeachOn'
import PrivateRoute from './component/PrivateRoute/PrivateRoute'
import ClassDetails from './component/AllClasses/ClassDetails'
import Login from './component/Login/Login'
import DashboardLayout from './component/DashboardLayout'
import StudentDashboard from './component/StudentDashboard/StudentDashboard'
import MyProfile from './component/StudentDashboard/MyProfile'
import AdminDashboard from './component/AdminDashboard/AdminDashboard'
import AdminUsers from './component/AdminDashboard/AdminUsers'
import TeacherRequest from './component/AdminDashboard/TeacherRequest'
import TeacherDashboard from './component/TeacherDashboard/TeacherDashboard'
import AddClass from './component/TeacherDashboard/AddClass'
import MyClassses from './component/TeacherDashboard/MyClasses'
import MyEnrolClass from './component/StudentDashboard/MyEnrolClass'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: "/login",
        element:<Login></Login>
      },
      {
        path: "allclasses",
        element: <Allclases></Allclases>
      },
      {
        path: '/teachon',
        element: <PrivateRoute><TeachOn></TeachOn></PrivateRoute>
        
      },
      {
        path: '/class/:id',
        element: <PrivateRoute><ClassDetails></ClassDetails></PrivateRoute>
      }
    ]
  },
  {
    path: '/',
    element: <DashboardLayout></DashboardLayout>,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard/student",
        element: <StudentDashboard></StudentDashboard>
      },
      {
        path: "/dashboard/myprofile",
        element: <MyProfile></MyProfile>
      },
      {
        path: '/dashboard/myenrolledclasses',
      element: <MyEnrolClass></MyEnrolClass>
      },
      {
        path: "/dashboard/admin",
        element: <AdminDashboard></AdminDashboard>
        
      },
      {
        path: '/dashboard/users',
        element: <AdminUsers></AdminUsers>
      },
      {
        path: '/dashboard/admin/teacherrequest',
        element: <TeacherRequest></TeacherRequest>
      },
      {
        path: '/dashboard/admin/allclasses',
        element: <TeacherRequest></TeacherRequest>
      },
      {
        path: '/dashboard/teacher',
        element: <TeacherDashboard></TeacherDashboard>
      },
      {
        path: '/dashboard/teacher/addclasses',
        element: <AddClass></AddClass>
      },
      {
        path: '/dashboard/teacher/myclasses',
        element: <MyClassses></MyClassses>
      }
    ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)