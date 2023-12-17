import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import { Link } from 'react-router-dom';



const FeaturePost = () => {
    const [Room,setroom] = useState([])
   
   useEffect(() =>{
    fetch('https://assinment-11-server-livid.vercel.app/roomdata')
    .then(res =>res.json())
    .then(data => setroom(data))
   },[])

    
        
    return (
   
        <div className=''>
                 <Marquee>
        <div className='flex md:px-10 lg:grid-cols-3 lg:px-0 xl:grid-cols-4 gap-5 mx-auto my-10 '>
            {
                Room?.map(room => (
                    <Link to={`/room/${room._id}`} key={room._id}>
                        <div  className='w-[320px] p-5 rounded-xl border-[1px] border-gray-300 mx-auto'>
                       <div className='relative'>
                       <img className='w-full rounded-xl shadow-xl' src={room.room_img} alt="" />
                 
                       </div>
                        <div className='mt-3 px-3 text-sm'>
                            <h1 className='text-lg font-semibold'>{room.h_name}</h1>
                            <p className='py-2'><FontAwesomeIcon icon={faLocation}></FontAwesomeIcon> Location : {room.h_location}</p>
                      
                        </div>
                    </div>
                    </Link>
                ))
            }
        </div>
        </Marquee>
              <Link to="/all-room" className='ml-5'>
           <button className='w-[120px] h-[55px] bg-blue-500 rounded-lg text-center  text-white font-medium ' >Book Now</button>
           </Link>
        </div>
    )
}

export default FeaturePost