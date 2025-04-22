import React from 'react';

const getInitials = (name) => {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();
};

const PersonalInfo = ({ user }) => {
    const initials = getInitials(user.name);

    return (
        <div className="bg-gray-900 text-white min-h-[90%] p-8">
            <h1 className="text-4xl font-bold text-center mb-10 border-b-4 border-blue-600 pb-2">
                Election Dashboard
            </h1>

            <div className="w-[60%] bg-gray-700 mx-auto rounded-2xl shadow-lg p-6 ">
                {/* Profile Photo */}
                <div className='flex flex-row items-center gap-6 mt-5'>
                    <div className="img flex justify-center items-center w-2/5">
                        <div className="bg-blue-600 cursor-pointer hover:bg-blue-500 transition rounded-full h-32 w-32 flex items-center justify-center text-4xl font-bold">
                            {initials}
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="w-full">
                        <div className="grid grid-cols-2 gap-5 text-lg">
                            <div className="font-bold text-gray-300">Username:</div>
                            <div>{user.username}</div>

                            <div className="font-bold text-gray-300">Password:</div>
                            <div>{'*'.repeat(user.password.length)}</div>

                            <div className="font-bold text-gray-300">Name:</div>
                            <div>{user.name}</div>

                            <div className="font-bold text-gray-300">Email:</div>
                            <div>{user.email}</div>
                        </div>
                    </div>
                </div>
                <div className="flex w-2/3 mx-auto border-t-blue-600 border-t-1 mt-16 flex-row justify-center">
                    <button className='bg-blue-600 hover:bg-blue-500 text-white text-xl font-medium py-2 px-5 rounded-lg cursor-pointer m-5'>Edit</button>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;
