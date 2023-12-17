import { faBed, faComment, faHandHoldingDollar, faLocation, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const RoomCards = ({Room}) => {
    console.log(Room);
   

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:px-10 lg:grid-cols-3 lg:px-0 xl:grid-cols-4 gap-5 mx-auto my-10 '>
            {
                Room?.map(room => (
                    <Link to={`/room/${room?.data._id}`} key={room?.data._id }>
                        <div  className='w-[320px] p-5 rounded-xl shadow-2xl mx-auto'>
                       <div className='relative'>
                       <img className='w-full rounded-xl shadow-xl' src={room?.data.room_img} alt="" />
                   {
                  `${room.data.offers.length}`>=1? <h className='text-sm font-extrabold rounded-full w-12 h-12 text-center pt-[15px] px-1 bg-white text-red-800 absolute top-3 right-3'>{room?.data.offers}%</h>:""
                   }
                       </div>
                        <div className='mt-3 px-3 text-sm'>
                            <h1 className='text-lg font-semibold'>{room?.data.h_name}</h1>
                            <p className='py-2'><FontAwesomeIcon icon={faLocation}></FontAwesomeIcon> Location : {room?.data.h_location}</p>
                           <div className='flex gap-2'>
                           <p className='py-2 flex-1'><FontAwesomeIcon icon={faUsers}></FontAwesomeIcon> Can Stay : {room?.data.people} people</p>
                            <p className='py-2'><FontAwesomeIcon icon={faBed}></FontAwesomeIcon> Bed : {room?.data.bed}</p>
                           </div>
                            <p className='py-2'><FontAwesomeIcon icon={faHandHoldingDollar}></FontAwesomeIcon>  Refund : {room?.data.refund} </p>
                            <p className='py-2'><FontAwesomeIcon icon={faComment}></FontAwesomeIcon>  Review Given By   : {room?.reviewData?.length} people</p>
                            <p className='text-base font-bold'>Price: ${room?.data.price}/night</p>
                        </div>
                    </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default RoomCards