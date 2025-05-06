import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import PollStat from "./PollStat";

const ElectionPage = ({ userEmail }) => {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      options: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const [elections, setElections] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedElection, setSelectedElection] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleElectionClick = (election) => {
    setSelectedElection(election);
  };

  // Fetch elections created by user on mount
  useEffect(() => {
    const fetchElections = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/get_user_polls?user=${userEmail}`
        );
        if (!res.ok) {
          const err = await res.json();
          console.error("API error:", err.error || "Unknown error");
          return;
        }

        const data = await res.json();
        console.log("Fetched elections:", data.polls);
        setElections(data.polls || []);
      } catch (error) {
        console.error("Failed to fetch elections:", error.message);
      }
    };

    if (userEmail) {
      fetchElections();
    }
  }, []);

  // Create election via backend API
  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    const payload = {
      poll_name: data.title,
      closing_date: data.date,
      candidates: data.options.map((opt) => opt.value),
      creator: userEmail,
    };
    reset({ title: "", date: "", options: [{ value: "" }] });

    try {
      const res = await fetch("http://localhost:5000/add_poll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        // Refetch or update elections list here if needed

        const fetchElections = async () => {
          try {
            const resE = await fetch(
              `http://localhost:5000/get_user_polls?user=${userEmail}`
            );
            if (!resE.ok) {
              const err = await resE.json();
              console.error("API error:", err.error || "Unknown error");
              return;
            }

            const data = await resE.json();
            console.log("Fetched elections:", data.polls);
            setElections(data.polls || []);
          } catch (error) {
            console.error("Failed to fetch elections:", error.message);
          }
        };

        fetchElections();

        setShowForm(false);
      } else {
        console.error("Failed to add election:", result.error);
      }
    } catch (error) {
      console.error("Error adding election:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-[90%] p-8">
      <h1 className="text-4xl font-bold text-center mb-10 border-b-4 border-blue-600 pb-2">
        Election Dashboard
      </h1>

      {/* Toggle Form */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer transition px-6 py-3 rounded-lg text-lg font-semibold"
        >
          {showForm ? "Cancel" : "Create New Election"}
        </button>
      </div>

      {/* Create Election Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-xl mx-auto bg-gray-900 p-6 rounded-xl shadow-md mb-10"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Election Title
                </label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Spring 2025 Elections"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Election Date
                </label>
                <input
                  type="date"
                  {...register("date", { required: true })}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Options */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Election Options
                </label>
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
                        {...register(`options.${index}.value`, {
                          required: true,
                        })}
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
                  onClick={() => append({ value: "" })}
                  className="mt-2 text-sm text-blue-400 cursor-pointer hover:text-blue-300"
                >
                  + Add Another Option
                </button>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className={`bg-blue-600 w-full py-2 mt-4 cursor-pointer rounded font-semibold transition ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
                disabled={loading} // Disable button while loading
              >
                {loading ? "Creating..." : "Create Election"}
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Past Elections */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-600 pb-1">
          Your Created Elections
        </h2>

        {elections.length > 0 ? (
          <motion.ul
            layout
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {elections.map((election) => (
              <motion.li
                layout
                key={election.id}
                className="hover:bg-gray-800 bg-gray-900 transition cursor-pointer p-4 rounded-lg shadow-md"
                onClick={() => handleElectionClick(election)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium">
                    {election.poll_name}
                  </span>
                  <span className="text-sm text-gray-400">
                    {election.closing_date}
                  </span>
                </div>
                {/* <ul className="text-sm text-gray-300 list-disc ml-6">
                  {election.candidates.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul> */}
              </motion.li>
            ))}
            {console.log(elections)}
          </motion.ul>
        ) : (
          <p className="text-gray-400">No elections created yet.</p>
        )}
      </div>

      {/* Election Stats Popup */}
      <PollStat
        poll={selectedElection}
        onClose={() => setSelectedElection(null)}
      />
    </div>
  );
};

export default ElectionPage;
