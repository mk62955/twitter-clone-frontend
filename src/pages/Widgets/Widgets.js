import React from 'react'
import './Widgets.css'
import SearchIcon from '@mui/icons-material/Search';
import {TwitterTweetEmbed,TwitterTimelineEmbed} from 'react-twitter-embed';

const Widgets = () => {
  return (
    <div className='w-1/4 widgets p-3 h-screen overflow-scroll overflow-x-hidden overflow-y-hidden'>
      <div className='flex items-center px-5 py-1 bg-blue-100 rounded-3xl'>
        <SearchIcon />
        <input type="text" placeholder='SearchTwitter' className='w-full ml-2 bg-blue-100 border-none'/>
      </div>
      <div className='py-3'>
        <h2 className='text-[20px] font-bold'>What's happening</h2>
      </div>
      <TwitterTweetEmbed
        tweetId={'1557187138352861186'}
      />
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="elonmusk"
        options={{height: 400}}
      />
    </div>
  )
}

export default Widgets
