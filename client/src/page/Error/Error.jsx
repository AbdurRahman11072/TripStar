import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/navbar'

const Error = () => {
   
    
    return (
        <div>
            <Navbar></Navbar>
           <Link to ={"/"}> 
           <img className='w-[100vw]' src="/404.png" alt="" />
           </Link>
        </div>
    )
}

export default Error