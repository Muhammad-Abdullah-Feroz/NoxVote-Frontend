import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'
import Lottie from 'lottie-react'
import About from './About'
import { useNavigate } from 'react-router'


const MainPage = () => {

    const [modal, setModal] = useState("welcome")
    const navigate = useNavigate()
    const goToDashboard = () => {
        navigate('/user', { state: user });
      };

    return (
        <div className="page bg-gray-800 h-screen">
            <div className="nav text-xl h-[10%] overflow-hidden flex flex-row justify-end items-center ">
                <ul className="nav flex flex-row justify-evenly w-1/6 items-center bg-gray-800 p-4 text-white space-x-12">
                    <li onClick={()=>{setModal("about")}} className="hover:border-b-blue-600 transition hover:border-b-2 cursor-pointer">About</li>
                    <li className="cursor-pointer"><button onClick={() => { modal == "login" ? setModal("register") : setModal("login") }} className='m-2 cursor-pointer py-2 px-4 bg-blue-600 border-black rounded-lg hover:bg-blue-500'>{modal == "login" ? "Register" : "Login"}</button></li>
                </ul>
            </div>

            <div className="content flex w-full flex-row h-[90%]">
                <div className="img border-r-2 border-gray-600 w-2/5 h-full bg-gray-800 text-white flex flex-col items-center justify-around py-10 px-6 space-y-6">

                    {/* Brand Section */}
                    <div className="flex flex-col items-center text-center space-y-2">
                        <h1 className="text-5xl font-extrabold text-blue-500">NoxVote</h1>
                        <p className="text-lg text-gray-300">Secure • Transparent • Decentralized</p>
                    </div>

                    {/* Illustration Section */}
                    {/* Animation Section */}
                   

                    {/* Testimonials & Features */}
                    <div className="text-sm text-gray-400 text-center space-y-4">
                        <blockquote className="italic text-gray-300 border-l-4 border-blue-600 pl-4 text-left">
                            "The best platform for secure and fair online voting. It changed the way we make decisions!"
                        </blockquote>
                        <div className="text-right text-gray-500">— Alex T., Community Leader</div>

                        <div>
                            <h2 className="text-lg font-semibold text-blue-400 mt-4">Why NoxVote?</h2>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-left text-gray-300">
                                <li>End-to-end encryption</li>
                                <li>Anonymous yet verifiable voting</li>
                                <li>Open source & community driven</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="populate pb-16 w-3/5">
                    {modal == "login" ? <Login /> : ""}
                    {modal == "register" ? <Register /> : null}
                    {modal == "about" ? <About /> : null}
                    {modal == "welcome" ? <div className="welcome bg-gray-800 flex flex-col justify-center items-center h-full">
                        <h1 className="text-4xl font-bold text-blue-600">Welcome to NoxVote</h1>
                        <p className=" text-white text-2xl mt-4">Be a part of the Decision.</p>
                        <button onClick={() => [setModal("register")]} className='bg-blue-600 text-white text-2xl rounded-xl cursor-pointer m-12 py-2 px-4 hover:bg-blue-500' >Register Now</button>
                    </div> : null
                    }
                </div>
            </div>
        </div>
    )
}

export default MainPage
