import React from 'react'

const UserNavbar = ({getModal}) => {
    return (
        <div className="nav w-full text-xl h-[10%] overflow-hidden flex flex-row justify-end items-center ">
            <ul className="nav flex flex-row justify-evenly items-center  p-4 text-white space-x-12">
                <li onClick={()=>getModal("info")} className="hover:border-b-blue-600 transition hover:border-b-2 cursor-pointer">Personal Info</li>
                <li onClick={()=>getModal("elections")} className="hover:border-b-blue-600 transition hover:border-b-2 cursor-pointer">Elections</li>
                <li onClick={()=>getModal("results")} className="hover:border-b-blue-600 transition hover:border-b-2 cursor-pointer">Results</li>
                <li onClick={()=>getModal("vote")} className="cursor-pointer"><button className='m-2 cursor-pointer py-2 px-4 bg-blue-600 border-black rounded-lg hover:bg-blue-500'>Vote</button></li>
            </ul>
        </div>
    )
}

export default UserNavbar
