import React from 'react'

const About = () => {
    return (
        <div className='bg-gray-900 flex flex-col justify-start items-center h-full w-full px-8 py-16 text-white space-y-12'>

            {/* Heading */}
            <h1 className="text-4xl text-blue-600 font-bold">About NoxVote</h1>

            {/* Intro */}
            <p className="text-lg max-w-3xl text-center text-gray-300">
                <span className="text-blue-400 font-semibold">NoxVote</span> is a decentralized, secure, and transparent voting platform designed to empower communities, organizations, and individuals to make collective decisions with confidence. Whether it’s electing leaders or making impactful choices, NoxVote ensures every voice is counted.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl text-center">
                <div className="p-6 bg-gray-700 rounded-lg shadow hover:shadow-blue-600 transition">
                    <h2 className="text-xl font-semibold text-blue-500 mb-2">🔒 End-to-End Encryption</h2>
                    <p className="text-gray-300 text-sm">Your vote is fully encrypted from submission to tally, ensuring maximum privacy and protection.</p>
                </div>

                <div className="p-6 bg-gray-700 rounded-lg shadow hover:shadow-blue-600 transition">
                    <h2 className="text-xl font-semibold text-blue-500 mb-2">🗳 Verifiable & Anonymous</h2>
                    <p className="text-gray-300 text-sm">Every vote is anonymous yet verifiable through blockchain technology for full trust and transparency.</p>
                </div>

                <div className="p-6 bg-gray-700 rounded-lg shadow hover:shadow-blue-600 transition">
                    <h2 className="text-xl font-semibold text-blue-500 mb-2">🌐 Open Source</h2>
                    <p className="text-gray-300 text-sm">We believe in open democracy — our source code is open and available for community contributions.</p>
                </div>
            </div>
        </div>

    )
}

export default About
