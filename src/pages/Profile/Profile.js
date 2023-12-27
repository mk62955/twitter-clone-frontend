import React from 'react'
import MainPage from './MainPage/MainPage'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init'

const Profile = () => {
  const [user] = useAuthState(auth)
  return (
    <div className='w-2/4 border-r-[1px] border-l-[1px] h-screen overflow-scroll overflow-x-hidden overflow-y-hidden'>
      <MainPage user={user}/>
    </div>
  )
}

export default Profile
