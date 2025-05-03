import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PollStat = ({ poll, onClose }) => {
  return (
    <AnimatePresence>
      {poll && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-4 text-gray-400 hover:text-white text-xl font-bold"
            >
              &times;
            </button>

            {/* Poll Title */}
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">
              {poll.poll_name}
            </h2>

            {/* Closing Date */}
            <div className="flex flex-col justify-evenly items-center">
            <p className="text-sm text-center text-gray-400 mb-4">
              Created By: {poll.created_by}
            </p>
            <p className="text-sm text-center text-gray-400 mb-4">
              Closing Date: {poll.closing_date}
            </p>
            </div>

            {/* Candidates and Votes */}
            <ul className="space-y-3">
              {poll.candidates.map((candidate, index) => (
                <li
                  key={index}
                  className="flex justify-between px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
                >
                  <span>{candidate}</span>
                  <span className="text-blue-300">{poll.votes[candidate]} votes</span>
                </li>
              ))}
            </ul>

            {/* Close Button (Bottom) */}
            <div className="flex justify-end mt-6">
              <button
                onClick={onClose}
                className="bg-gray-600 hover:bg-gray-500 transition px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PollStat;
