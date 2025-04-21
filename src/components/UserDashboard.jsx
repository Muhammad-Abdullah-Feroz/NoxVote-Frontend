import React, { useState } from 'react'
import UserNavbar from './UserNavbar'
import PersonalInfo from './PersonalInfo';
import { useLocation } from 'react-router';

const UserDashboard = () => {

  const [modal, setModal] = useState("info");
  const location = useLocation()
  const user1 = location.state
  
  return (
    <div className='page bg-gray-800 max-h-screen h-screen'>
      <UserNavbar getModal = {(value)=>{setModal(value)}} />
      <div className='content w-full  h-[90%] max-h-[90%] overflow-y-hidden'>
      {modal == "info" ? <PersonalInfo user={ user1} /> :null}
      {modal == "contact" ? <div className='font-bold text-white bg-gray-800 text-4xl'>Contact</div>:null}
      {modal == "elections" ? <div className='font-bold text-white bg-gray-800 text-4xl'>Elections</div>:null}
      {modal == "vote" ? <div className='font-bold text-white bg-gray-800 text-4xl'>Vote</div>:null}
      </div>
    </div>
  )
}

export default UserDashboard
