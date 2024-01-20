import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WelcomeBanner from "../dashboard/WelcomeBanner";
import VoterCard from "../vote/VoterCard";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function PollVote() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pollDetail } = location.state;

  const [selectedCandidateId, setSelectedCandidateId] = useState("");

  const handleVoteChange = (candidate) => {
    setSelectedCandidateId(candidate.id);
  };

  const handleSubmit = async () => {
    const selectedCandidate = pollDetail.candidates.find(
      (candidate) => candidate.id === selectedCandidateId
    );
    if (selectedCandidate) {
      const formData = new FormData();
      formData.append("poll_id", pollDetail.id);
      formData.append("candidate_id", selectedCandidate.id);
      try {
        const url = "/votes/vote";
        const response = await axios.post(url, formData);
        const { data, status } = response.data;
        if (status === "success") {
          const message = "Vote casted successfully";
          const notify = () => {
            toast.success(message, {
              position: toast.POSITION.TOP_CENTER,
            });
          };
          notify();
          navigate("/");
        } else {
          const notify = () => {
            toast.error("Something went wrong", {
              position: toast.POSITION.TOP_CENTER,
            });
          };
          notify();
        }
        console.log("vote data", data);
      } catch (error) {
        console.log("error", error);
      }
    } else {
      console.log("No candidate has been selected.");
    }
  };

  const dt = new Date();
  const hr = dt.getHours();
  let title;

  if (hr < 12) {
    title = "Good Morning Voter👋";
  } else if (hr < 17) {
    title = "Good Afternoon Voter 👋";
  } else {
    title = "Good Evening Voter 👋";
  }

  const content = `Your voice matters, and every vote counts. Cast your vote for the candidate you believe will best represent your interests and values.`;
  return (
    <>
      {/* Welcome banner */}
      <WelcomeBanner title={title} content={content} />
      {/* Dashboard actions */}

      <div className="w-full py-8 bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">
            {pollDetail.name}
          </h1>
          <p className="text-center text-base w-2/3 mx-auto mb-8">
            {pollDetail.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {pollDetail.candidates.map((candidate, index) => (
              <VoterCard
                key={index}
                candidate={candidate}
                handleVoteChange={handleVoteChange}
                selectedCandidateId={selectedCandidateId}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg transition duration-300"
              onClick={handleSubmit}
            >
              Submit Vote
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
    </>
  );
}

export default PollVote;
