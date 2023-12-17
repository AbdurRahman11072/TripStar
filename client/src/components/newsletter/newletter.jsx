import React from 'react';

const Newsletter = () => {
    const handleNewsletterSubmit = e =>{
        e.preventDefault()
        toast.success('Subscribed');
    }
    return (
        <div className='mb-5' >
            <h1 className="text-2xl lg:text-4xl font-bold text-center  my-12">Newsletter</h1>
            <div className="flex flex-col  mx-auto overflow-hidden rounded-lg shadow-lg dark:bg-gray-800 md:flex-row md:h-48">
                <div className="md:flex md:items-center md:justify-center md:w-1/2  bg-blue-500">
                    <div className="px-6 py-6 md:px-8 md:py-0">
                        <h2 className="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">Sign Up For <span className="text-yellow-400">Offer</span> Updates</h2>

                        <p className="mt-2 text-sm text-white ">Welcome to our latest newsletter, we invite you to experience the epitome of luxury, comfort, and unmatched hospitality.</p>
                    </div>
                </div>

                <div className="flex items-center justify-center pb-6 md:py-0 md:w-1/2 gap-1">
                    <form onSubmit={handleNewsletterSubmit}>
                        <div className="flex flex-col p-1.5 overflow-hidden border-2 border-[#00917c] rounded-lg dark:border-gray-600 lg:flex-row dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                            <input className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent" type="text" name="email" placeholder="Enter your email" aria-label="Enter your email" required/>

                            <button className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-blue-500 rounded-md  focus:outline-none">subscribe</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Newsletter