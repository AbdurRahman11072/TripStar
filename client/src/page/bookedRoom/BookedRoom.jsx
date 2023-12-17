import { faCalendarCheck, faCalendarDays, faHouseMedicalCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';

const BookedRoom = () => {

  const {user} = useContext(AuthContext)
  const navigate =useNavigate(null)
 const [Room,setRoom] =useState();
 const [userid,setuserid] = useState({}) 
 const [fData,setfData] = useState({})

console.log(Room);
console.log(userid);
console.log(fData)
console.log(user?.email);

useEffect(() => {

  // fetch("https://assinment-10-server-d599a7wcc-abdurrahman11072.vercel.app/bookedroom?email=${user?.email}",{
  //   method:"POST",
  //   withCredentials: true,
  //   headers:{
  //       'content-type': 'application/json'
  //   },
  //   body : JSON.stringify()
  //  })
  //   .then(res => setRoom(res.data))

  //   // .then (data => {
  //   //   if(data.insertedId)
  //   //    {
  //   //    return Swal.fire(
  //   //       'successfull',
  //   //       'Movide has been ADDED',
  //   //       'success'
  //   //     )
  //   //    }
         
  //   //     })
        
    axios
      .get(`https://assinment-11-server-livid.vercel.app/bookedroom?email=${user?.email}`, {
        withCredentials: true,
      })
      .then((res) => setRoom(res.data));
  }, [user]);
 


// Date calculation and cancle reservation
 const clanderday = (id) => {
  
        console.log(id);
   
            
            const filterdata = Room?.find((data) =>data.id ==id)
            
      
          
        const d1 = filterdata.currentDate
        console.log(d1);
        const d2 = filterdata.Cheack_in_date
        console.log(d2)
        let date1 = new Date(d1);
        let date2 = new Date(d2);
        const time = Math.abs(date1-date2);
        const days = Math.ceil(time/(1000*60*60*24));
        console.log(days);

        if(days<=1){
            Swal.fire(
                'Sorry',
                `you can't cencle the reservation`,
                'error'
            )
        }
        else{
           const id=filterdata._id
           console.log(id);
            DeleteHandler(id)
        }
     }

//   const UpdateHandler = () =>{
        
//     const h_name =data.h_name
//     const h_discription =data.h_discription
//     const price =data.price
//     const room_size =data.room_size
//     const room_img =data.room_img
//     const offers =data.offers
//     const h_location =data.h_location
//     const people =data.people
//     const bed =data.bed
//     const refund =data.refund
//     const breakfast =data.breakfast
//     const r_avaliable =data.r_avaliable
//     const booked_room = count
       

//     const Data = {h_name, h_discription,price,room_size,room_img,offers,h_location,people,bed,refund,breakfast,r_avaliable,booked_room,
        
//     };

//    fetch(`https://assinment-11-server-livid.vercel.app/bookedroom/${data._id}`,{
//     method:"PATCH",
//     headers:{
//         'content-type': 'application/json'
//     },
//     body : JSON.stringify(Data)
//    })
//     .then(res => res.json())

//         .then (data => {
//             alert("Successfull")
//         })
        

//  }

// cancle reservation

const DeleteHandler = (_id) =>{
    console.log(_id)
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
    
        fetch(`https://assinment-11-server-livid.vercel.app/bookedroom/${_id}`,{
            method:"DELETE",
           
        })
        .then(res =>res.json())
        .then(data => {
            if(data.deletedCount > 0)
        {
            Swal.fire(
                'successfull',
                'Movide Has Been Belete',
                'success'
              )
              RoomSetHandler()
              axios
      .get(`https://assinment-11-server-livid.vercel.app/bookedroom?email=${user?.email}`, {
        withCredentials: true,
      })
      .then((res) => {
        setRoom(res.data)
       
    });
             
        }
        })
        
        }
      })
 }

//  update booking information 


const updateDate = () =>{
    Swal.fire({
        title: "Change Date",
        input: "date",
    inputAttributes: {
    autocapitalize: "off"
  },
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Success!",
            text: "Your Checking Date has been Changed.",
            icon: "success"
          });
        }
      });
      
}


const UpdateHandler = (id) =>{ 
    setuserid(id)
    const filterData = Room?.find(data =>data._id==id)
    setfData(filterData);
}
console.log(userid);
       
    const Dateupdate =e =>{
        e.preventDefault();
    
       const id =fData.id
       const email = user?.email
       const h_name =fData?.h_name
       const h_discription =fData?.h_discription
       const price =fData?.price
       const room_size =fData?.room_size
       const room_img =fData?.room_img
       const offers =fData?.offers
       const h_location =fData?.h_location
       const people =fData?.people
       const bed =fData?.bed
       const refund =fData?.refund
       const breakfast =fData?.breakfast
       const r_avaliable =fData.r_avaliable       
       const booked_room = fData?.booked_room       
       const Cheack_in_date =e.target.date.value
       const currentDate =fData.currentDate
   
       const Data = {
           id,         
           email,
           h_name,
           h_discription,
           price,
           room_size,
           room_img,
           offers,
           h_location,
           people,
           bed,
           refund,
           breakfast,
           r_avaliable,
           booked_room,
           Cheack_in_date,
           currentDate
           
       };
  

   fetch(`https://assinment-11-server-livid.vercel.app/bookedroom/${fData._id}`,{
    method:"PUT",
    headers:{
        'content-type': 'application/json'
    },
    body : JSON.stringify(Data)
   })
    .then(res => res.json())

        .then (data => {
            Swal.fire(
                'successfull',
                'Date Update Successfull',
                'success'
                
              )
              navigate('/booked-room')
            //   RoomSetHandler()
            axios
            .get(`https://assinment-11-server-livid.vercel.app/bookedroom?email=${user?.email}`, {
              withCredentials: true,
            })
            .then((res) => {
                setRoom(res.data)
            
              
            });
        })
        

    }
   
 


//  update room set 

const RoomSetHandler = () =>{
       
    // const h_name =data.h_name
    // const h_discription =data.h_discription
    // const price =data.price
    // const room_size =data.room_size
    // const room_img =data.room_img
    // const offers =data.offers
    // const h_location =data.h_location
    // const people =data.people
    // const bed =data.bed
    // const refund =data.refund
    // const breakfast =data.breakfast
    // const r_avaliable =
    // const booked_room = count
       

    // const Data = {
    //     h_name,
    //     h_discription,
    //     price,
    //     room_size,
    //     room_img,
    //     offers,
    //     h_location,
    //     people,
    //     bed,
    //     refund,
    //     breakfast,
    //     r_avaliable,
    //     booked_room,
        
    // };

//    fetch(`https://assinment-11-server-livid.vercel.app/roomdata/${data._id}`,{
//     method:"PUT",
//     headers:{
//         'content-type': 'application/json'
//     },
//     body : JSON.stringify(Data)
//    })
//     .then(res => res.json())

//         .then (data => {
//             // console.log(data)
//         })
        

 }

    return (
       <div>
            <Helmet>
                
                <title>My Booking</title>
                
            </Helmet>

<div className="modal" id="my_modal_8">
  <div className="modal-box ">
    <img className='w-[73%]  mx-auto rounded-xl shadow-xl' src={fData?.room_img} alt="" />
    <h1 className='text-2xl font-bold my-3 text-center underline'>{fData?.h_name}</h1>
    <h3 className="font-bold text-lg text-center pl-3">Change Date</h3>
    <form onSubmit={Dateupdate} className='mt-2 w-[172px] mx-auto '>
    <input  type="date" name='date' className=' w-48 h-16 border-2 border-blue-500 rounded-xl p-2 block' />
       <div className='flex mt-5 gap-2'>
      
       <button type='submit'  className='btn w-[90px] bg-blue-500  text-white font-medium '>Submit</button>

        <div className="">
     <a href="#" className="btn w-[90px] bg-blue-500 text-white font-medium">close</a>
    </div>
       </div>
    </form>
    
    
  </div>
</div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:px-10 lg:grid-cols-3 lg:px-0 xl:grid-cols-4 gap-5 mx-auto my-10 '>
            {
                Room?.map(room => (
                 
                        <div key={room._id} className='w-[320px] p-5 rounded-xl shadow-2xl mx-auto'>
                       <div className='relative'>
                       <img className='w-full rounded-xl shadow-xl' src={room.room_img} alt="" />
                
                       </div>
                        <div className='mt-3 px-3 text-sm'>
                            <h1 className='text-lg font-semibold'>{room.h_name}</h1>                           
                           <div className='flex gap-2'>
                           <p className='py-2 flex-1'><FontAwesomeIcon icon={faHouseMedicalCircleCheck} /> Room Booked : {room.booked_room} Room</p>                            
                           </div>
                           <p className='py-2'> <FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon> Room Booked date : {room.currentDate}</p>
                           <p className='py-2'><FontAwesomeIcon icon={faCalendarCheck}></FontAwesomeIcon> Checking Date : {room.Cheack_in_date}</p>
                           
                        </div>
                      
                            
                        <div className='my-3'>                                                
                      <div className='w-[100%] h-10 bg-blue-500 text-white text-center py-2'>
                     
                      <a href='#my_modal_8' onClick={() =>UpdateHandler(room._id)} >  
                       <button  >Update Date</button>
                       </a>
                       
                      </div>
                       <div className='flex gap-2 my-2'>
                       <button onClick={() =>clanderday(room.id)} className='w-[48%] h-10 flex-1 bg-blue-500 text-white'>Cancel Booking</button>
                       <Link to={`/room/${room.id}`} className='w-[48%] h-10 bg-blue-500 text-white text-center py-2' > <button>Add Review</button></Link>
                       </div>
                        </div>
                    </div>
                   
                ))
            }
            </div>
        </div>
    )
}

export default BookedRoom