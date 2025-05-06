import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result); // The complete user object
        // Call your getUser function (if necessary)
        // getUser(result.user);
        navigate("/user", { state: result.user });
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Network or Server error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login h-full w-full bg-gray-900 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-blue-600">Login to NoxVote</h1>
      <div className="w-full max-w-md p-8 text-white rounded">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium  mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="p-3 w-full rounded bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="p-3 w-full rounded bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer hover:bg-blue-700 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
