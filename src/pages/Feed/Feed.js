import React, { useEffect, useState } from 'react'
import TweetBox from '../TweetBox/TweetBox'
import Post from './Post/Post'

const Feed = () => {
  const [posts,setPosts]=useState([])

  useEffect(()=>{
    fetch('http://localhost:5000/post')
    .then(res=>res.json())
    .then(data=>{
      setPosts(data)
    })
  },[])

  return (
    <div className='w-2/4 p-5 border-r-[1px] border-l-[1px] h-screen overflow-scroll overflow-x-hidden overflow-y-hidden'>
      <div className='sidebar-content-wrapper'>
      <p className='text-[30px] text-left'>Home</p>
      <hr />
      <TweetBox/>
      {
        posts.map(p=><Post key={p._id} p={p} />)
      }
      </div>
    </div>
  )
}

export default Feed
