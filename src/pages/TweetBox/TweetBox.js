import { Avatar } from "@mui/material";
import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from 'axios';
import "./Tweetbox.css";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from '../../firebase.init'
const TweetBox = () => {
  const [post, setPost] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [loggedInUser] = useLoggedInUser();
  const [user] = useAuthState(auth)
  const email = user?.email;
  const userProfilePic = loggedInUser[0]?.profileImage?loggedInUser[0]?.profileImage:"https://static.thenounproject.com/png/4851855-200.png"

  const handleUploadImage=(e)=>{
    setIsLoading(true)
    const image= e.target.files[0]
    const formData=new FormData();
    formData.set('image',image)
    axios.post("https://api.imgbb.com/1/upload?key=2b3f5f33b70c38c3d1670364c6fb1d6c",formData)
    .then(res=>{
      setImageURL(res.data.data.display_url)
      console.log(res.data.data.display_url)
      setIsLoading(false);
    })
    .catch((error)=>{
      console.log(error);
      setIsLoading(false);
    })
  }
  const handleTweet = (e) => {
    e.preventDefault();
    if(user.providerData[0].providerId==='password'){
      fetch(`https://mern-twitter-clone-backend-fwmh.onrender.com/loggedInUser?email=${email}`)
      .then(res=>res.json())
      .then(data=>{
          setName(data[0]?.name)
          setUsername(data[0]?.username)
      })
    }
    else{
      setName(user?.displayName)
      setUsername(email?.split('@')[0])
    }
    if (name){
      const userPost = {
        profilePhoto:userProfilePic,
        post: post,
        photo: imageURL,
        username:username,
        name:name,
        email:email,
      };
      setPost('');
      setImageURL('');
  
      fetch(`http://localhost:5000/post`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(userPost)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
        });
    }
  };
  return (
    <div className="tweetBox">
      <form onSubmit={handleTweet}>
        <div className="tweetBox__input">
          <Avatar src="https://static.thenounproject.com/png/4851855-200.png" />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => 
              setPost(e.target.value)
            }
            value={post}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="image" className="imageIcon">
            {
              isLoading?<p>Uploading Image</p>:<p>{imageURL?'image uploaded':<AddPhotoAlternateIcon />}</p>
            }
          </label>
          <input
            type="file"
            id="image"
            className="imageInput"
            placeholder="What's happening"
            onChange={handleUploadImage}
            
          />
          <button type="submit" className="tweetBox__tweetButton">
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
};

export default TweetBox;
