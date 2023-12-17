import React from 'react';
import { Helmet } from "react-helmet";
import FeaturePost from '../../components/FeaturedPost/featurepost';
import Banner from '../../components/banner/banner';
import Map from '../../components/map/map';
import Newsletter from '../../components/newsletter/newletter';

const Home = () => {
    return (
        <div>
           <Helmet>
                
                <title>Home</title>
                
            </Helmet>
            <div className='container mx-auto mt-10 '>
                <Banner></Banner>
            </div>
            <div className='my-10 px-2'>
                <h1 className='text-2xl lg:text-4xl font-bold text-center  mt-2'>Feathure Room</h1>
                

           <FeaturePost></FeaturePost>
         
            </div>
            <div data-aos="fade-up"
     data-aos-anchor-placement="top-center" className='mx-2 my-10'>
            <Map></Map>
            </div>
            <div className='mx-2'>
            <Newsletter></Newsletter>
            </div>
        </div>
    )
}

export default Home