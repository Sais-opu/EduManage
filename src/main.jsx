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
import MyEnrolClass from './component/StudentDashboard/MyEnrolClass'
import Payment from './component/AllClasses/Payment'
import MyEnrollClassDetails from './component/StudentDashboard/MyEnrollClassDetails'
import { ToastContainer } from 'react-toastify'
import MyClass from './component/TeacherDashboard/MyClass'
import AdminAllClasses from './component/AdminDashboard/AdminAllClasses'
import SeeDetails from './component/TeacherDashboard/SeeDetails'


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
        path:"/payment/:id",
        element: <Payment></Payment>
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
        path: '/dashboard/my-enrollclasses',
      element: <MyEnrolClass></MyEnrolClass>
      },
      {
        path: '/dashboard/myenroll-class/:cls',
        element: <MyEnrollClassDetails></MyEnrollClassDetails>
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
        element: <AdminAllClasses></AdminAllClasses>
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
      element : <MyClass></MyClass> 
      },
      {
        path: '/dashboard/my-class/:id',
        element: <SeeDetails></SeeDetails>
      }
    ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="bounce"
      />
    </AuthProvider>
  </StrictMode>,
)