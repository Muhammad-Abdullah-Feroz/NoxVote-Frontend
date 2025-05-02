import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const PersonalInfo = ({ user }) => {
  const [editableUser, setEditableUser] = useState(user);
  const initials = getInitials(editableUser.name);
  const [showEdit, setShowEdit] = useState(false);
  const { register, handleSubmit, reset , formState:{errors} } = useForm({
    defaultValues: {
      name: editableUser.name,
      password: editableUser.password,
    }
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: editableUser.email,
          name: data.name,
          password: data.password,
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        setEditableUser((prev) => ({ ...prev, ...data }));
        setShowEdit(false);
        alert("User info updated successfully");
      } else {
        alert(result.error || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    }
  };
  

  return (
    <div className="bg-gray-900 text-white min-h-[90%] p-8 relative">
      <h1 className="text-4xl font-bold text-center mb-10 border-b-4 border-blue-600 pb-2">
        Election Dashboard
      </h1>

      <div className="w-[60%] bg-gray-700 mx-auto rounded-2xl shadow-lg p-6 ">
        <div className='flex flex-row items-center gap-6 mt-5'>
          <div className="img flex justify-center items-center w-2/5">
            <div className="bg-blue-600 cursor-pointer hover:bg-blue-500 transition rounded-full h-32 w-32 flex items-center justify-center text-4xl font-bold">
              {initials}
            </div>
          </div>

          <div className="w-full">
            <div className="grid grid-cols-2 gap-5 text-lg">
              <div className="font-bold text-gray-300">Username:</div>
              <div>{editableUser.username}</div>

              <div className="font-bold text-gray-300">Password:</div>
              <div>********</div>

              <div className="font-bold text-gray-300">Name:</div>
              <div>{editableUser.name}</div>

              <div className="font-bold text-gray-300">Email:</div>
              <div>{editableUser.email}</div>
            </div>
          </div>
        </div>

        <div className="flex w-2/3 mx-auto border-t-blue-600 border-t-1 mt-16 flex-row justify-center">
          <button
            onClick={() => {
              reset({ name: editableUser.name, password: editableUser.password });
              setShowEdit(true);
            }}
            className='bg-blue-600 hover:bg-blue-500 text-white text-xl font-medium py-2 px-5 rounded-lg cursor-pointer m-5'
          >
            Edit
          </button>
        </div>
      </div>

      {/* Edit Popup */}
      <AnimatePresence>
        {showEdit && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">Edit Information</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Password</label>
                  <input
                    type="password"
                    {...register("password", { required: "password is required" })}
                    className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setShowEdit(false)}
                    className="bg-gray-600 hover:bg-gray-500 transition px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 transition px-4 py-2 rounded"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PersonalInfo;
