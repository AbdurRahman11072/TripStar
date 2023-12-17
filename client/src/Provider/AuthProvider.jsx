import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import React, { createContext, useEffect, useState } from 'react';
import swal from "sweetalert";
import app from '../Firebase/Firebase.config';


export const AuthContext = createContext(null);
const Provider = new GoogleAuthProvider()
const auth = getAuth(app);




const AuthProvider = ({children}) => {
    const [user, setuser] = useState(null);
    const [loading,setloading] = useState(true)
    const [DarkMode,setDarkMode] =useState(true)
 
    
   
    const googleSignin =() =>{
        return signInWithPopup(auth,Provider);
    }

    const Signup = (email,password) =>{
        setuser(null);
        setloading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const Signin = (email,password) =>{
        setloading(true)
        return signInWithEmailAndPassword(auth, email, password)
        
    }
    const Updateprofile = (name,photo) =>{
              return  updateProfile(auth.currentUser, {       
                 displayName: name,
                  photoURL: photo
      })
    }
    // console.log(user)

    
    const LogOut = () => {
        setloading(true)
        signOut(auth).then(() => {
            swal("Logout Successfull", "", "success");
            setTimeout(() => {
               
                Navigate('/'),10
              }, "1500");
        
        }).catch((error) => {
            console.log("error");
        });
    }
    console.log(user);
    
    useEffect(() =>{
        const UnSubscribe = onAuthStateChanged(auth,(currentUser) =>{
            const userEmail = currentUser?.email || user?.email
            const loggedUser = {email: userEmail}
            setuser(currentUser);
            // console.log("State Change");
            setloading(false)
         
            
            
            
        });
        return(() =>{
            return UnSubscribe();
        })
        
    },[googleSignin,Signin])


      
    const userInfo = 
    {
        googleSignin,
        loading,
        Signup,
        user,
        Signin,
        LogOut,
        Updateprofile,
        DarkMode,
        setDarkMode
      
      
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;