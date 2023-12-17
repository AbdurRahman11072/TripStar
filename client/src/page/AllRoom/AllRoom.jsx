import { faComment, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Helmet } from "react-helmet"
import { useLoaderData } from 'react-router-dom'
import RoomCards from '../../components/roomcards/roomcards'

const AllRoom = () => {
    const data = useLoaderData()
    const [room,setroom] = useState()
    const [review,setreview] = useState()
    const [ReviewData,setReviewData] = useState(room)

  

   useEffect(() =>{
       fetch('https://assinment-11-server-livid.vercel.app/review')
       .then(res =>res.json())
       .then(data =>setreview(data))
   },[])

//     useEffect(() =>{
//         const cardsData = data.map((data) =>data.id);
//         const reviewData =review.filter((data) =>cardsData.includes(data.id))
//         console.log(reviewData)


//    },[data,review])
// console.log(room);
useEffect(() =>{
    const cardsData = data.map((data) =>{
        const reviewData =review?.filter((review) =>review.roomid ==data._id)
            return {
                data,
                reviewData
            }

    });
setReviewData(cardsData)
setroom(cardsData)



},[data,review])
console.log(ReviewData);
useEffect(()=>{
const rdata=ReviewData?.map(data=>{
    const fdata= data.reviewData.length();
    return {
       fdata
    }
})







console.log(rdata);

},[])

    const FilterByPrice = (e) =>{
        e.preventDefault();
        const inputText =parseInt(e.target.price.value);
        console.log(inputText);
        if(inputText>0){
            const filterData = ReviewData.filter(data=>data?.data.price <=inputText);
            setReviewData(filterData);
            console.log(filterData);
        }
        else{
            setReviewData(room)
        }
    }
    const showall = () =>{
        setReviewData(room)
    }
        
    return (
        <div className='mt-10'>
             <Helmet>
                
                <title>Rooms</title>
                
            </Helmet>
            <div className='w-[95vw] h-[400px] overflow-hidden mx-auto  '>
                <img className='w-full h-full brightness-50 rounded-2xl' src="/AllRoom.jpg" alt="" />
                <div className='w-full absolute top-80 text-center'>
                <h1 className='text-white text-7xl font-extrabold '>All <span className='text-yellow-400'>Rooms</span></h1>
                </div>
            </div>
            <div className='flex mx-auto w-[95vw] h-16 bg-blue-500 mt-10 rounded-xl px-5 pt-3'>
               <div className='flex-1 gap-4 ' >
               <div className='flex gap-4'>
               <p className='mt-2 text-white'>Filter By Price:</p>

                <form onSubmit={FilterByPrice}>
                <input  className='w-40 h-10 px-5 border-[2px] text-white border-white bg-blue-500 placeholder:text-white focus:border-[2px] focus:outline-none transition-3s' type="text" name="price" placeholder='Enter Price' />
                <button type='submit'><FontAwesomeIcon icon={faSearch} style={{marginTop:"12px",marginLeft:"-40px", color:"white"}}></FontAwesomeIcon></button>
                </form>
                
                <button onClick={showall} className='text-blue-500 w-20 h-10 p-2 text-sm font-semibold rounded-lg bg-white'>Show All</button>
               </div>
               </div>
               <p className='py-2 text-xl text-white'><FontAwesomeIcon icon={faComment}></FontAwesomeIcon> Total Review : {review?.length}  </p>

            </div>
           <div className=''> <RoomCards Room={ReviewData}></RoomCards> </div>
        </div>
    )
}

export default AllRoom