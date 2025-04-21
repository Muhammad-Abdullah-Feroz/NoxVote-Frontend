import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

const ElectionPage = ({ pastElections }) => {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      options: [{ value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const [elections, setElections] = useState(pastElections || []);
  const [showForm, setShowForm] = useState(false);

  const onSubmit = (data) => {
    const newElection = {
      id: elections.length + 1,
      title: data.title,
      date: data.date,
      options: data.options.map((opt) => opt.value),
    };
    setElections([newElection, ...elections]);
    reset({ title: '', date: '', options: [{ value: '' }] });
    setShowForm(false);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-10 border-b-4 border-blue-600 pb-2">
        Election Dashboard
      </h1>

      {/* Toggle Form */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg text-lg font-semibold"
        >
          {showForm ? 'Cancel' : 'Create New Election'}
        </button>
      </div>

      {/* Create Election Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-xl mx-auto bg-gray-800 p-6 rounded-xl shadow-md mb-10"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Election Title</label>
                <input
                  type="text"
                  {...register('title', { required: true })}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Spring 2025 Elections"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Election Date</label>
                <input
                  type="date"
                  {...register('date', { required: true })}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Options */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Election Options</label>
                <div className="space-y-2">
                  {fields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center gap-3"
                    >
                      <input
                        type="text"
                        {...register(`options.${index}.value`, { required: true })}
                        placeholder={`Option ${index + 1}`}
                        className="flex-1 px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500 hover:text-red-600 text-xl"
                          title="Remove option"
                        >
                          &times;
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Add Option Button */}
                <button
                  type="button"
                  onClick={() => append({ value: '' })}
                  className="mt-2 text-sm text-blue-400 hover:text-blue-300"
                >
                  + Add Another Option
                </button>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-blue-600 w-full py-2 mt-4 rounded font-semibold hover:bg-blue-700 transition"
              >
                Submit Election
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Past Elections */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-600 pb-1">
          Past Participated Elections
        </h2>

        {elections.length > 0 ? (
          <motion.ul layout className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {elections.map((election) => (
              <motion.li
                layout
                key={election.id}
                className="bg-gray-800 p-4 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium">{election.title}</span>
                  <span className="text-sm text-gray-400">{election.date}</span>
                </div>
                <ul className="text-sm text-gray-300 list-disc ml-6">
                  {election.options.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <p className="text-gray-400">No past elections found.</p>
        )}
      </div>
    </div>
  );
};

export default ElectionPage;
