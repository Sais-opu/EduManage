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
        element: <TeachOn></TeachOn>
        
      },
      {
        path: '/class/:id',
        element: <PrivateRoute><ClassDetails></ClassDetails></PrivateRoute>
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