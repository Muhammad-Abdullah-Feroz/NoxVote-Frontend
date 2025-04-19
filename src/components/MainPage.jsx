import React from 'react'

const MainPage = () => {
    return (
        <div className="page bg-gray-800 h-screen">
        <div className="nav flex flex-row justify-end items-center ">
            <ul className="nav flex flex-row justify-evenly w-1/6 items-center bg-gray-800 p-4 text-white space-x-12">
                <li className="hover:text-gray-400 hover:border-b-blue-600 transition hover:border-b-2 cursor-pointer">About</li>
                <li className="cursor-pointer"><button className='m-2 cursor-pointer py-2 px-4 bg-blue-500 border-black rounded-lg hover:bg-blue-400'>Login</button></li>
            </ul>
        </div>
        </div>
    )
}

export default MainPage
