import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Helmet } from "react-helmet";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { AuthContext } from '../../Provider/AuthProvider';
// import axios from 'axios';

 


const Login = () => {
 
  const [isshow,setshow] = useState(false);
  const [Error ,SetError] = useState("");
  const {googleSignin,Signin} = useContext(AuthContext);
  const navigate = useNavigate(null);
  const location = useLocation();
  
  // console.log(location)

 

  const handleGoogleSignIn =() =>{
    googleSignin()
    .then(() =>{
   
      swal("Login Success full", "", "success"); 
      axios
      .post(
        "https://assinment-11-server-livid.vercel.app/jwt",
        { email },
        { withCredentials: true }
      )
      .then((res) => console.log(res.data));
        
      setTimeout(() => {
        navigate(location?.state ? location.state:'/'),10
      }, "1500");

    
    
      
    })
    .catch(error =>{
      
      swal(error.massage, "", "error");
    })

  }

  const handlerLogin = e =>{
    e.preventDefault();
  
    const email =e.target.email.value;
    const password = e.target.password.value;
    const data ={
      email,password
    }
    console.log(data)

   
    
          Signin(email,password)
          .then(() =>{
            // console.log(email);
            swal("Login Successfull", "", "success");
            setTimeout(() => {
              navigate(location?.state ? location.state:'/'),10
            }, "1500");
      
            
            axios
          .post(
            "https://assinment-11-server-livid.vercel.app/jwt",
            { email },
            { withCredentials: true }
          )
          .then((res) => console.log(res.data));

            //   fetch("https://assinment-11-server-livid.vercel.app/jwt",{
            // method:"POST",
            // headers:{
            //     'content-type': 'application/json'
            // },
            // body : JSON.stringify(data)
            // })
            // .then(res => console.Console.log(res.data))
  
            // setTimeout(() => {
            //   navigate(location?.state ? location.state:'/'),10
            // }, "1500");
          })
          .catch((error) =>{
            console.log(error.code)
            SetError("Email or Password is Worng")
          })

  }

 
    return (
      <div className='py-5'>
                <Helmet>
                
                <title>Login</title>
                
                </Helmet>
          
            <section className=" h-[800px] flex items-center justify-center ">

<div className="bg-white/10 backdrop-sepia-0 border-2 border-blue-500 flex rounded-2xl shadow-2xl max-w-3xl p-5 items-center">

  <div className="md:w-1/2 px-8 md:px-16">
    <h2 className="font-bold text-2xl text-black">Login</h2>
    <p className="text-xs mt-4 text-black">If you are already a member, easily log in</p>

    <form onSubmit={handlerLogin} className="flex flex-col gap-4">
     
        <div className='relative'>
        <input className="p-2 mt-8 rounded-lg border-2 border-blue-500 outline-none w-full  text-black font-semibold  " type="email" name="email" placeholder="Enter Email"/>
        </div>
      <div className="relative">
        <input className="p-2 rounded-lg border-2 border-blue-500 w-full outline-none  text-black font-semibold  " type={isshow ?"password":"text"}  name="password" placeholder="Enter Password"/>
        <svg onClick={()=>setshow(!isshow)}  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
        </svg>
      </div>
      <button type='submit' className="bg-indigo-600 rounded-lg text-white font-bold py-2 hover:scale-105 duration-300">Login</button>
    </form>

    <div className="mt-6 grid grid-cols-3 items-center text-white">
      <hr className="border-gray-400"/>
      <p className="text-center text-sm">OR</p>
      <hr className="border-gray-400"/>
    </div>

    <button  onClick={handleGoogleSignIn} className="bg-indigo-600  py-2 w-full rounded-lg mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-white font-bold">
      <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
      </svg>
      Login with Google
    </button>

    <div className="mt-5 text-xs border-b border-[#fff] py-4 text-black">
      <a href="#">Forgot your password?</a>
    </div>

    <div className="mt-3 text-xs flex justify-between items-center text-black">
      <p>Don't have an account?</p>
      <NavLink to="/signup">
      <button className="py-2 px-5 bg-indigo-600 rounded-xl hover:scale-110 text-white font-bold duration-300">Register</button>
      </NavLink>
    </div>
  </div>

  <div className="md:block hidden w-1/2 rounded-md">
    <video className='rounded-lg' src="/login.mp4" autoPlay loop muted></video>
  </div>
</div>
</section>
        </div>
      
    );
};

export default Login;