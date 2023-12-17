import React from 'react'

const Banner = () => {
    return (
        <div className='mx-2'>
            <div className='relative'>
                <div >
                    <img data-aos="fade-left" className='w-full h-[250px]  md:h-[600px] rounded-2xl shadow-2xl brightness-50' src="/banner.jpg" alt="" />
                </div>
                <div data-aos="fade-right" className='absolute top-10 md:top-52 text-center w-full '>
                    <h1 className='text-2xl md:text-5xl text-white font-extrabold '>Book your Stay with Tripstar</h1>
                    <h1 className='text-2xl md:text-6xl text-white font-extrabold mt-2 md:mt-10'>For <span className='text-yellow-300'>25% Off</span></h1>
                    <h1 className='text-sm md:text-xl text-white font-medium mt-2 md:mt-5'>1,400,855 rooms around the world are waiting for you.</h1>
                    <button className='w-[100px] h-[40px] md:w-[120px] md:h-[55px] bg-blue-500 rounded-lg text-center  text-white font-medium mt-5 mx-auto' >Book Now</button>
                </div>
            </div>
        </div>
    )
}

export default Banner