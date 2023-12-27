import React, { useState } from "react";
import twitterImage from "../../assets/img/Twitter-logo1.jpg";
import TwitterIcon from "@mui/icons-material/Twitter";
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from '../../firebase.init'
import GoogleButton from "react-google-button";
import { Link, useNavigate } from 'react-router-dom';
import './login.css'

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    // const [errorMsg,setErrorMsg]=useState('');

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [signInWithGoogle, googleuser, googleloading, googleerror] = useSignInWithGoogle(auth);
    const navigate=useNavigate()

    if(user || googleuser){
        navigate('/')
        console.log(user);
        console.log(googleuser);
    }
    if(error){
        console.log(error)
    }
    if(loading){
        console.log('loading.......')
    }

    const handleSubmit=e=>{
        e.preventDefault();
        console.log(email,password);
        signInWithEmailAndPassword(email,password);
    }

    const handleGoogleSigIn=()=>{
        signInWithGoogle()
    }

  return (
    <div className="h-screen w-screen flex">
      <div className="image-container h-screen w-3/5">
        <img src={twitterImage} alt="" className="h-screen"/>
      </div>
      <div className="form-container h-full w-2/5 p-12">
        <TwitterIcon className="my-3 w-5 text-blue-500" />
        <h2 className="text-[40px] font-bold my-4">Happening Now</h2>
        <h2 className="text-[30px] font-bold my-4">What's happening today</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" className="w-full px-4 py-3" placeholder="Email address" onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" className="w-full px-4 py-3" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
          <div className="btn-login">
            <button type="submit" className="w-full font-bold text-white px-4 py-3 bg-blue-500 my-2 rounded-[5px]">
              Login
            </button>
          </div>                            
        </form>
        <hr />
        <div className="">
            <GoogleButton className="my-4 mx-auto" type="light" onClick={handleGoogleSigIn}/>
        </div>
        <div>
            Don't have an account? 
            <Link to="/signup" style={{
                textDecoration:'none',
                fontweight:'600',
                marginLeft:'5px',
            }} className="text-blue-600">SignUp</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
