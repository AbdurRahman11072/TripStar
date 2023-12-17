import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faBed, faHandHoldingDollar, faLocation, faMinus, faPlus, faShareNodes, faUsers, faUtensils, faVectorSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AuthContext } from '../../Provider/AuthProvider'
import BookedRoom from '../../page/bookedRoom/BookedRoom'
import Review from './review'

const Detailcard = () => {
    const {user} = useContext(AuthContext)
    const navigate =useNavigate(null)
    console.log(user);
    const loderData = useLoaderData()  
 
    const [data,setdata] = useState([])
    const id = useParams()
    const [a_room,seta_room] =useState()
    const [booked,setbooked] =useState()
    console.log(booked);
  
    console.log(id);
    console.log(data);
    console.log(a_room);
    const Newdate = new Date();
        let day = Newdate.getDate();
        if(day<10){
            day ="0"+day
        }
        const month = Newdate.getMonth() + 1;
        const year = Newdate.getFullYear();
        const currentDate = `${year}-${month}-${day}`
        console.log(a_room);
 

    const [count,setcount] = useState(0)
    const add =() =>{
        const addcount=count+1;       
        setcount(addcount)  
        const RoomCount = data.r_avaliable-count;
        const Room_count = RoomCount-1
        seta_room(Room_count);
              
    }
  
    
    const remove =() =>{
        if(count!=0){
            const addcount=count-1;           
            setcount(addcount)
            const RoomCount = a_room+1;        
        seta_room(RoomCount);
          
          
        }
        
    }
  
    useEffect(()=>{
        const filterData = loderData?.find(data =>data._id ==id._id)
        setdata(filterData);
    },[])
    console.log(data);
    console.log(id.id);

    const BookedRoomHandler = (e) =>{
     e.preventDefault()
        const id =data._id
        const email = user.email
        const h_name =data.h_name
        const h_discription =data.h_discription
        const price =data.price
        const room_size =data.room_size
        const room_img =data.room_img
        const offers =data.offers
        const h_location =data.h_location
        const people =data.people
        const bed =data.bed
        const refund =data.refund
        const breakfast =data.breakfast
        const r_avaliable =a_room
        const booked_room = count
        const Cheack_in_date =e.target.date.value
        const currentDate =e.target.date1.value
    
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
        console.log(Data);
        
    
       fetch(`https://assinment-11-server-livid.vercel.app/bookedroom`,{
        method:"POST",
        headers:{
            'content-type': 'application/json'
        },
        body : JSON.stringify(Data)
       })
        .then(res => res.json())
    
            .then (data => {
                Swal.fire({
                    title: "Successfull",
                    text: "Room has been booked",
                    icon: "success",
                    
                  });
               UpdateHandler();
               navigate('/booked-room')
            })
            setbooked(true)
     }

     const UpdateHandler = () =>{
       
        const h_name =data.h_name
        const h_discription =data.h_discription
        const price =data.price
        const room_size =data.room_size
        const room_img =data.room_img
        const offers =data.offers
        const h_location =data.h_location
        const people =data.people
        const bed =data.bed
        const refund =data.refund
        const breakfast =data.breakfast
        const r_avaliable =a_room
        const booked_room = count
           

        const Data = {
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
            
        };
    
       fetch(`https://assinment-11-server-livid.vercel.app/roomdata/${data._id}`,{
        method:"PUT",
        headers:{
            'content-type': 'application/json'
        },
        body : JSON.stringify(Data)
       })
        .then(res => res.json())
    
            .then (data => {
               
            })
            
    
     }

     const clanderday = () => {
        const d1 = document.getElementById("date").value;
        const d2 = document.getElementById("date1").value;
        let date1 = new Date(d1);
        let date2 = new Date(d2);
        const time = Math.abs(date1-date2);
        const days = Math.ceil(time/(1000*60*60*24));
        console.log(days,d1,d2);
     }
     const MainFunction =(e) =>{
        e.preventDefault()
        BookedRoomHandler(e);     
        
      
     }

// fetch review data 



 
    return (
        <div>

<div className="modal" id="my_modal_8">
  <div className="modal-box ">
    <img className='w-[73%]  mx-auto rounded-xl shadow-xl' src={data?.room_img} alt="" />
    <h1 className='text-2xl font-bold my-3 text-center underline'>{data?.h_name}</h1>
    <h3 className="font-bold text-lg text-center pl-3">Price: {data.price}</h3>
    <form onSubmit={MainFunction} className='mt-8 w-[350px]  mx-auto'>
                    <div className='flex gap-5'>
                    <div className='relative'>
                    <input className='w-40 h-16 border-2 border-blue-500 rounded-xl text-center py-4 text-xl font-semibold text-blue-500' value={count}/>
                    <h1 onClick={remove} className='absolute w-8 h-8 top-4 left-4 text-lg'><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></h1>
                    <h1 onClick={add} className='absolute w-8 h-8 top-4 right-4 text-lg'><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></h1>
                    </div>
                    <div>
                        <input type="date" className=' w-40 h-16 border-2 border-blue-500 rounded-xl p-2' name="date" id="date" />
                        <input type="date" className=' w-40 h-16 border-2 border-blue-500 rounded-xl p-2' name="date1" id="date1" value={currentDate} hidden />
                    </div>
                    </div>
                    <div className='flex mt-5 gap-2 justify-center'>
      
                    <button type='submit'  className='btn w-[90px] bg-blue-500  text-white font-medium '>Submit</button>

                        <div className="">
                    <a href="#" className="btn w-[90px] bg-blue-500 text-white font-medium">close</a>
                    </div>
                    </div>
    </form>  
    
     
       
  
    
    
  </div>
</div>


           <div className=' lg:flex p-10 my-5 '>
            <div className=' xl:w-[60vw] lg:h-[520px]  '><img className='w-full' src={data.room_img}alt="" /></div>
            <div className='w-[100%]  mt-10 xl:mt-0 xl:w-[30vw] xl:px-10'>
                <h1 className='text-3xl font-extrabold'>{data.h_name}</h1>
                <h1 className='text-lg font-medium text-gray-500 mt-2'>Price : ${data.price}/night</h1>

                <div className='flex  '>
                <div className="rating rating-sm mt-2">
                    <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" checked />
                    <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                </div> <span className='mt-[4px]'>|</span> 
                </div>
                <h1 className='mt-4 font-medium '><FontAwesomeIcon icon={faLocation} style={{paddingRight:"4px"}} ></FontAwesomeIcon> Location : {data.h_location}</h1>
                 
                <h1 className='mt-4 font-medium flex-1'><FontAwesomeIcon icon={faVectorSquare} ></FontAwesomeIcon> Room Size : {data.room_size} Sqr</h1>
                <h1 className='mt-4 font-medium'> <FontAwesomeIcon icon={faUsers} style={{paddingRight:"4px"}}></FontAwesomeIcon> People : {data.people} people can stay</h1>
              
              
                <h1 className='mt-4 font-medium flex-1'> <FontAwesomeIcon icon={faBed} style={{paddingRight:"4px"}}></FontAwesomeIcon> Bed : {data.bed} King size Bed</h1>
                <h1 className='mt-4 font-medium'> <FontAwesomeIcon icon={faHandHoldingDollar} style={{paddingRight:"4px"}} ></FontAwesomeIcon> Refund : {data.refund}</h1>
                <h1 className='mt-4 font-medium'><FontAwesomeIcon icon={faUtensils} style={{paddingRight:"4px"}} /> Breakfast : {data.breakfast}</h1>
                <h1 className='mt-4 font-medium'><FontAwesomeIcon icon={faShareNodes} style={{paddingRight:"4px"}} /> Share : <FontAwesomeIcon icon={faFacebook} style={{paddingRight:"7px", fontSize:"20px"}} /> <FontAwesomeIcon icon={faTwitter} style={{paddingRight:"6px", fontSize:"20px"}} /> <FontAwesomeIcon icon={faLinkedin} style={{paddingRight:"6px", fontSize:"20px"}}  /></h1>
                <h1 className='mt-4 font-medium'> Discription : {data.h_discription}</h1>
                <h1 className='mt-4 font-medium'>Room Avaliable : {data.r_avaliable}</h1>
                <div className='w-full justify-center'>
                {
                    !user?<Link to="/login">

                        <button   className='w-[120px] h-[55px] bg-blue-500 rounded-lg text-center  text-white font-medium mt-5 mx-auto'>Book Now</button>
                    </Link>
                    :                    
                        <a href='#my_modal_8'  > 
                         <button  className='w-[120px] h-[55px] bg-blue-500 rounded-lg text-center  text-white font-medium mt-5 mx-auto'>Book Room</button>
                         </a>
                   
                   
                        
                    
                    }
            
                </div>

                           
                    
                

            </div>
           </div>           
           <div hidden><BookedRoom id={id}></BookedRoom></div>
           <Review id={id}  ></Review>
        </div>
    )
}

export default Detailcard