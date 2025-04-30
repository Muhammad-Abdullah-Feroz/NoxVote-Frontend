import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VotingPage = ({ ongoingElections }) => {
  const [votes, setVotes] = useState({});
  const [submitted, setSubmitted] = useState({});

  const handleVote = (electionId, option) => {
    setVotes((prev) => ({ ...prev, [electionId]: option }));
  };

  const handleSubmitVote = (electionId) => {
    if (votes[electionId]) {
      setSubmitted((prev) => ({ ...prev, [electionId]: true }));

      // Optionally send vote to backend here
      console.log(`Submitted vote for Election ${electionId}: ${votes[electionId]}`);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-10 border-b-4 border-blue-600 pb-2">
        Cast Your Vote
      </h1>

      {ongoingElections.length > 0 ? (
        <motion.div
          layout
          className="space-y-6 max-w-3xl min-h-[90%d] mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {ongoingElections.map((election) => (
            <motion.div
              key={election.id}
              layout
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-semibold mb-1">{election.title}</h2>
              <p className="text-gray-400 mb-4 text-sm">Ends on: {election.date}</p>

              <div className="space-y-2 mb-4">
                {election.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center gap-3 bg-gray-700 px-4 py-2 rounded cursor-pointer transition 
                      ${votes[election.id] === option ? 'border border-blue-500 bg-opacity-80' : 'hover:bg-gray-600'}`}
                  >
                    <input
                      type="radio"
                      name={`election-${election.id}`}
                      value={option}
                      checked={votes[election.id] === option}
                      onChange={() => handleVote(election.id, option)}
                      disabled={submitted[election.id]}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>

              <AnimatePresence>
                {!submitted[election.id] ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSubmitVote(election.id)}
                    className="bg-blue-600 px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
                  >
                    Submit Vote
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="text-blue-400 font-medium"
                  >
                    ✅ Vote Submitted: <span className="font-semibold">{votes[election.id]}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-400 text-lg">No ongoing elections at the moment.</p>
      )}
    </div>
  );
};

export default VotingPage;
