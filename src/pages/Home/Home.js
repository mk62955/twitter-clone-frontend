import React from "react";
import Slidebar from "../Sidebar/Sidebar";
import Widgets from "../Widgets/Widgets";
import { signOut } from "firebase/auth";
import auth from '../../firebase.init'
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet } from "react-router-dom";
import useLoggedInUser from "../hooks/useLoggedInUser";

const Home = () => {
  const user = useAuthState(auth)

  const [loggedInUser]=useLoggedInUser()
  // console.log(loggedInUser)
  
  const handleLogout=()=>{
    signOut(auth);
  }


  return (
    <div>
      <div className="mx-20 flex">
        <Slidebar handleLogout={handleLogout} user={user}/>
        <Outlet/>
        <Widgets/>
      </div>
    </div>
  );
};

export default Home;
