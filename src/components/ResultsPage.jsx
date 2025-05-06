import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ResultsPage = () => {
    const [pastPolls, setPastPolls] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPastPolls = async () => {
            try {
                // const response = await fetch('http://localhost:5000/past_polls');
                // for testing purposes using all the polls instead of just the past ones
                const response = await fetch('http://localhost:5000/get_polls');
                if (!response.ok) throw new Error('Failed to fetch past polls');
                const data = await response.json();
                console.log('Past polls:', data.polls);
                setPastPolls(data.polls);
            } catch (error) {
                console.error('Error fetching past polls:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPastPolls();
    }, []);

    const calculatePercent = (votes, total) => {
        return total > 0 ? ((votes / total) * 100).toFixed(1) : "0.0";
    };

    return (
      <div className=" text-white min-h-screen p-8">
        <h1 className="text-4xl font-bold text-center mb-10 border-b-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text pb-2">
          Past Elections Results
        </h1>

        {loading ? (
          <p className="text-center text-gray-400 text-lg">
            Loading results...
          </p>
        ) : pastPolls.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            No past elections available.
          </p>
        ) : (
          <motion.div layout className="space-y-6 max-w-3xl mx-auto">
            {pastPolls.map((poll) => {
              const votes = poll.votes || {}; // correct key from backend
              const totalVotes = Object.values(votes).reduce(
                (sum, val) => sum + val,
                0
              );

              return (
                <motion.div
                  key={poll.id}
                  layout
                  className="bg-gray-800 backdrop-blur-sm  border-blue-500 hover:border-blue-400 transition-all duration-300 mb-4 overflow-hidden p-5 rounded-2xl"
                >
                  <h2 className="text-2xl font-semibold mb-1">
                    {poll.poll_name}
                  </h2>
                  <p className="text-gray-400 mb-4 text-sm">
                    Ended on: {poll.closing_date}
                  </p>

                  {Object.keys(votes).length === 0 ? (
                    <p className="text-gray-400 italic">No votes recorded.</p>
                  ) : (
                    <div className="space-y-2">
                      {Object.entries(votes).map(([candidate, count]) => (
                        <div
                          key={candidate}
                          className="bg-gray-700 px-4 py-2 rounded"
                        >
                          <p className="flex justify-between">
                            <span className="font-medium">{candidate}</span>
                            <span>
                              {count} votes (
                              {calculatePercent(count, totalVotes)}%)
                            </span>
                          </p>
                          <div className="w-full bg-gray-600 rounded-full h-2 mt-1">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{
                                width: `${calculatePercent(
                                  count,
                                  totalVotes
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    );
};

export default ResultsPage;
