import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Detailcard from '../components/Detailcard/detailCard'
import MainLayout from '../components/Layout/MainLayout'
import AllRoom from '../page/AllRoom/AllRoom'
import Error from '../page/Error/Error'
import Home from '../page/Home/Home'
import Login from '../page/Login/Login'
import SignUp from '../page/Signup/SignUp'
import BookedRoom from '../page/bookedRoom/BookedRoom'
import Privateroutes from './Privateroutes'


const Routes = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout></MainLayout>,
        errorElement:<Error></Error>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/all-room",
                element:<AllRoom></AllRoom>,
                loader: () => fetch("https://assinment-11-server-livid.vercel.app/roomdata")
            },
            {
                path:"/room/:_id",
                element:<Detailcard></Detailcard>,
                loader: () => fetch("https://assinment-11-server-livid.vercel.app/roomdata")
                
            },
            {
                path:"/booked-room",
                element:<Privateroutes><BookedRoom></BookedRoom></Privateroutes>,
              
            },
            {
                path:"/login",
                element:<Login></Login>
            },
            {
                path:"/signup",
                element:<SignUp></SignUp>
            }
        ]
    }
])

export default Routes