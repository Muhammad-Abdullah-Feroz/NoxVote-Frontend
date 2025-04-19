import React from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div className="login h-full w-full bg-gray-800 flex flex-col justify-center items-center">

            <h1 className='text-4xl font-bold text-blue-600'>Login to NoxVote</h1>
            <div className="w-full max-w-md p-8 text-white rounded shadow-md">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium  mb-1">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium  mb-1">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
