import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { image } from "../helpers/helper";

function VoteAnalysis() {
  const [votes, setVotes] = useState([]);

  async function fetchVotes() {
    try {
      const response = await axios.get("/votes");
      const { status, data } = response.data;
      if (status === "success") {
        setVotes(data);
        const notify = () => {
          toast.success("Votes fetched successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
        };
        notify();
      }
    } catch (error) {
      console.error("Error fetching votes:", error);
      const notify = () => {
        toast.error("Error fetching votes", {
          position: toast.POSITION.TOP_CENTER,
        });
      };
    }
  }

  useEffect(() => {
    fetchVotes();
  }, []);

  const groupedVotesByPoll = {};
  votes.forEach((vote) => {
    const pollName = vote.poll.name;
    if (!groupedVotesByPoll[pollName]) {
      groupedVotesByPoll[pollName] = [];
    }
    groupedVotesByPoll[pollName].push(vote);
  });

  console.log("groupedVotesByPoll", groupedVotesByPoll);

  return (
    <div>
      <ToastContainer />
      {Object.keys(groupedVotesByPoll).map((pollName, index) => {
        const totalVotes = groupedVotesByPoll[pollName].reduce(
          (sum, vote) => sum + vote._count.id,
          0
        );
        const winner = groupedVotesByPoll[pollName].reduce(
          (maxVote, vote) =>
            vote._count.id > maxVote._count.id ? vote : maxVote,
          { _count: { id: 0 } }
        );
        return (
          <div
            key={index}
            className="my-5 dark:bg-gray-800 bg-slate-200 rounded-lg"
          >
            <h2 className="py-6 px-12 font-extrabold dark:text-gray-100 text-2xl dark:bg-gray-700 bg-slate-300 rounded-t-lg">
              {pollName}
            </h2>
            <div className="grid grid-cols-4 gap-5 p-4">
              {groupedVotesByPoll[pollName].map((vote) => (
                <div
                  key={vote.candidate_id}
                  className="shadow-lg bg-gray-50 dark:bg-gray-600 mb-4 rounded-lg border relative"
                >
                  <img
                    className="w-full rounded-t-lg"
                    src={
                      vote.candidate.photo !== null &&
                      image(vote.candidate.photo)
                    }
                    alt={`candidates/${vote.candidate.name}`}
                  />
                 {vote.candidate_id === winner.candidate_id && (
                    <div className="bg-green-500 text-white absolute top-0 right-0 p-5 rounded-b-full shadow-lg">
                      Winner
                    </div>
                  )}
                  <div className="px-2 py-1">
                    <h1 className="text-lg font-semibold dark:text-gray-200">
                      {vote.candidate.name}
                    </h1>
                    <div className="flex justify-between items-center pb-3">
                      <p className="text-sm">
                        {vote.candidate.platform !== null
                          ? vote.candidate.platform.name
                          : "Independent"}
                      </p>
                      <p className="text-xs bg-red-600 rounded-full py-[2px] px-2 text-white">
                        {((vote._count.id / totalVotes) * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default VoteAnalysis;
