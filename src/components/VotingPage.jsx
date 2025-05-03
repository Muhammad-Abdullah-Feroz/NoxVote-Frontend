import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VotingPage = ({ userEmail }) => {
  const [votes, setVotes] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [ongoingElections, setOngoingElections] = useState([]);
  const [userVoteStatus, setUserVoteStatus] = useState({});

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // 1. Get polls
        const pollsRes = await fetch("http://localhost:5000/ongoing_polls");
        if (!pollsRes.ok) throw new Error("Failed to fetch polls");
        const pollData = await pollsRes.json();
        setOngoingElections(pollData.ongoing_polls);

        // 2. Get user vote status
        const voteStatusRes = await fetch(`http://localhost:5000/user_vote_status?userEmail=${userEmail}`);
        if (!voteStatusRes.ok) throw new Error("Failed to fetch user vote status");
        const voteStatusData = await voteStatusRes.json();
        setUserVoteStatus(voteStatusData.user_votes);

        // 3. Prepopulate votes and submitted
        const initialVotes = {};
        const initialSubmitted = {};
        for (const pollId in voteStatusData.user_votes) {
          const { voted, candidate } = voteStatusData.user_votes[pollId];
          if (voted) {
            initialVotes[pollId] = candidate;
            initialSubmitted[pollId] = true;
          }
        }
        setVotes(initialVotes);
        setSubmitted(initialSubmitted);
      } catch (error) {
        console.error("❌ Error loading data:", error);
      }
    };

    fetchInitialData();
  }, [userEmail]);

  const handleVote = (electionId, option) => {
    setVotes((prev) => ({ ...prev, [electionId]: option }));
  };

  const handleSubmitVote = async (electionId) => {
    const selectedCandidate = votes[electionId];
    const election = ongoingElections.find(e => e.id === electionId);

    if (!selectedCandidate || !election) return;

    try {
      const response = await fetch("http://localhost:5000/cast_vote", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          poll_name: election.poll_name,
          candidate: selectedCandidate,
          userEmail: userEmail,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted((prev) => ({ ...prev, [electionId]: true }));
        console.log(`✅ Vote submitted: ${selectedCandidate}`);
      } else {
        alert(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      console.error("❌ Error submitting vote:", error);
      alert("❌ Failed to submit vote. Please try again.");
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
          className="space-y-6 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {ongoingElections.map((election) => (
            <motion.div
              key={election.id}
              layout
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-semibold mb-1">{election.poll_name}</h2>
              <p className="text-gray-400 mb-4 text-sm">Ends on: {election.closing_date}</p>

              <div className="space-y-2 mb-4">
                {election.candidates.map((option, index) => (
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
