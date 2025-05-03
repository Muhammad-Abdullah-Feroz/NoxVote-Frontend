import React, { useState } from 'react'
import UserNavbar from './UserNavbar'
import PersonalInfo from './PersonalInfo';
import { useLocation } from 'react-router';
import ElectionPage from './ElectionPage';
import VotingPage from './VotingPage';

const UserDashboard = () => {

  const [modal, setModal] = useState("info");
  const location = useLocation()
  const user1 = location.state
  const pastElections = [
  { id: 1, title: '2023 Student Elections', date: '2023-12-01', options: ['Candidate A', 'Candidate B'] },
  { id: 2, title: '2024 General Elections', date: '2024-04-15', options: ['Candidate X', 'Candidate Y'] },
  ]

  return (
    <div className='page bg-gray-900 max-h-screen h-screen'>
      <UserNavbar getModal = {(value)=>{setModal(value)}} />
      <div className='content w-full  h-[90%] max-h-[90%] overflow-y--hidden'>
      {modal == "info" ? <PersonalInfo user={ user1} /> :null}
      {modal == "elections" ? <ElectionPage userEmail={user1.email} />:null}
      {modal == "vote" ? <VotingPage userEmail={user1.email}/> :null}
      </div>
    </div>
  )
}

export default UserDashboard
