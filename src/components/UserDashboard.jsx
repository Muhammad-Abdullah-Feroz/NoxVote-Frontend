import React, { useState } from 'react'
import UserNavbar from './UserNavbar'

const UserDashboard = () => {

  const [modal, setModal] = useState("info");

  return (
    <div className='page bg-gray-800 h-screen'>
      <UserNavbar getModal = {(value)=>{setModal(value)}} />
      <div className='content w-full  h-[90%]'>
      {modal == "info" ? <div className='font-bold text-white bg-gray-800 text-4xl'>Personal Info</div>:null}
      {modal == "contact" ? <div className='font-bold text-white bg-gray-800 text-4xl'>Contact</div>:null}
      {modal == "elections" ? <div className='font-bold text-white bg-gray-800 text-4xl'>Elections</div>:null}
      {modal == "vote" ? <div className='font-bold text-white bg-gray-800 text-4xl'>Vote</div>:null}
      </div>
    </div>
  )
}

export default UserDashboard
