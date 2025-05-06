import { nav } from 'framer-motion/client';
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const Register = () => {

    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onsubmit = async (data) => {
        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    name: data.name,
                    username: data.username

                }),
                credentials: "include"
            });
    
            const result = await response.json();
    
            if (response.ok) {
                console.log(result);
                toast.success("User Created");
                // clear the form
                reset();

            } else {
                toast.error(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error("Network or Server error:", error);
            toast.error("An unexpected error occurred");
        }
    };
    

    return (
        <div className="register h-full w-full bg-gray-900 flex flex-col justify-center items-center px-4">
            <h1 className="text-4xl text-blue-600 font-bold my-4">Register in NoxVote</h1>

            <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col space-y-2 w-full max-w-md p-8  text-white">
                <div className="flex flex-col">
                    <label className="mb-2 font-semibold">Email</label>
                    <input type="email" {...register("email", {
                        required: "Email is required", pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address"
                        }
                    })}
                        className="p-3 rounded bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 font-semibold">Display Name</label>
                    <input
                        type="text"
                        {...register("username", { required: "Name is required" })}
                        className="p-3 rounded bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 font-semibold">Full Name</label>
                    <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="p-3 rounded bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>}
                </div>
                <div className="flex flex-row space-x-4 w-full">
                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold">Password</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                            className="p-3 w-full rounded bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold">Confirm Password</label>
                        <input
                            type="password"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === watch("password") || "Passwords do not match"
                            })}
                            className="p-3 w-full m- rounded bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 mt-1 text-sm">{errors.confirmPassword.message}</p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-4 py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition duration-200"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register
