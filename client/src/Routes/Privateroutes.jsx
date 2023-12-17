import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Privateroutes = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();
    console.log(location)
    if(loading)
    {
        return <span className="loading loading-spinner mx-auto text-accent"></span>
    }

    if(user){
        return children
    }
    else{
        return <Navigate state={location.pathname} to="/login" repace  ></Navigate>
    }
    
    return (
        <div>
            
        </div>
    );
};

export default Privateroutes;