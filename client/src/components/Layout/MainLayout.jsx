import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/navbar'

const MainLayout = () => {
    return (
        <div>
            <div className='shadow-md'>
                <Navbar></Navbar>
            </div>
            <Outlet></Outlet>
        </div>
    )
}

export default MainLayout