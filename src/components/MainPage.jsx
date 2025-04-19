import React, { useState } from 'react'
import Login from './Login'


const MainPage = () => {

    const [modal, setModal] = useState("welcome")

    return (
        <div className="page bg-gray-800 h-screen">
            <div className="nav text-xl h-[10%] overflow-hidden flex flex-row justify-end items-center ">
                <ul className="nav flex flex-row justify-evenly w-1/6 items-center bg-gray-800 p-4 text-white space-x-12">
                    <li className="hover:border-b-blue-600 transition hover:border-b-2 cursor-pointer">About</li>
                    <li className="cursor-pointer"><button onClick={() => { setModal("login") }} className='m-2 cursor-pointer py-2 px-4 bg-blue-600 border-black rounded-lg hover:bg-blue-500'>Login</button></li>
                </ul>
            </div>

            <div className="content flex w-full flex-row h-[90%]">
                <div className="img w-2/5 h-full bg-amber-50">
                </div>
                <div className="populate pb-16 w-3/5">
                    {modal == "login" ? <Login /> :
                        <div className="welcome bg-gray-800 flex flex-col justify-center items-center h-full">
                            <h1 className="text-4xl font-bold text-blue-600">Welcome to NoxVote</h1>
                            <p className=" text-white text-2xl mt-4">Be a part of Decision.</p>
                            <button className='bg-blue-600 text-white text-2xl rounded-xl cursor-pointer m-12 py-2 px-4 hover:bg-blue-500' >Register Now</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MainPage
