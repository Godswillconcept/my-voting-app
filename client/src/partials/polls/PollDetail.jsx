import React, { useEffect, useState } from "react";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import { calculateCountdown } from "../../helpers/helper";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "flowbite-react";
import CandidateCard from "../candidates/CandidateCard";
import PlatformCard from "../platforms/PlatformCard";

function PollDetail() {
  const [pollDetail, setPollDetail] = useState(null);
  const [countdown, setCountdown] = useState("");

  const { pollId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPollDetail = async (pollId) => {
      try {
        const url = `/polls/${pollId}/detail`;
        const response = await axios.get(url);
        let { data } = response.data;
        setPollDetail(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPollDetail(pollId);
  }, [pollId]);

  useEffect(() => {
    if (pollDetail) {
      const intervalId = setInterval(() => {
        setCountdown(calculateCountdown(pollDetail.start_time));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [pollDetail]);

  const handleVote = (pollDetail) => {
    navigate(`/${pollDetail.id}/vote`, { state: { pollDetail } });
  };
  return (
    <>
      <h2 className="text-2xl font-bold dark:text-white mt-3 mb-8">
        Poll Information
      </h2>
      {/* PollDetail actions */}

      {pollDetail && (
        <div>
          <WelcomeBanner
            title={pollDetail.name}
            content={pollDetail.description}
          />
          <div className="bg-yellow-100 p-6 my-12">
            <h2 className="text-center text-lg font-bold dark:text-primary marker">
              Countdown to Poll Start
            </h2>

            {/* Check if current time is before start_time */}
            {new Date() < new Date(pollDetail.start_time) && (
              <p className="text-4xl font-bold dark:text-red-500 marker text-center">
                {countdown}
              </p>
            )}

            {/* Check if current time is between start_time and end_time */}
            {new Date() >= new Date(pollDetail.start_time) &&
              new Date() <= new Date(pollDetail.end_time) && (
                <div className="flex justify-center item-center my-3">
                  <Button onClick={() => handleVote(pollDetail)}>
                    Vote Now!
                  </Button>
                </div>
              )}

            {/* Check if current time is after end_time */}
            {new Date() > new Date(pollDetail.end_time) && (
              <p className="text-4xl font-bold dark:text-red-500 marker text-center">
                Poll has ended
              </p>
            )}
          </div>

          <div className="">
            <h2 className="text-2xl font-bold dark:text-white my-3">
              Registered Candidates for the poll
            </h2>

            {pollDetail.candidates != null ? (
              <div className="grid grid-cols-3 gap-8 mt-5 mb-16">
                {pollDetail.candidates.map((candidate, index) => (
                  <CandidateCard candidate={candidate} key={index} />
                ))}
              </div>
            ) : (
              "No Candidate"
            )}

            <h2 className="text-2xl font-bold dark:text-white my-3">
              Registered Platforms for the poll
            </h2>

            <div className="grid grid-cols-3 gap-5 mt-5 mb-16">
              {pollDetail.pollPlatforms != null
                ? pollDetail.pollPlatforms.map((platformDetail, index) => (
                    <PlatformCard platformDetail={platformDetail} key={index} />
                  ))
                : "No platform added"}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PollDetail;
