import React, { useEffect, useState } from "react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import {
  calculateCountdown,
  image,
  truncateSentenceByWords,
} from "../../helpers/helper";
import { MdOutlineLocationOn } from "react-icons/md";
import { BsBrowserEdge } from "react-icons/bs";
import { useParams } from "react-router-dom";
import flag from "../../images/emblem.jpeg";
import male from "../../images/profile (2).svg";
import axios from "axios";

function PollDetail() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pollDetail, setPollDetail] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [candidates, setCandidates] = useState(null);

  const { pollId } = useParams();

  useEffect(() => {
    const fetchPollDetail = async (pollId) => {
      try {
        const url = `http://localhost:3300/polls/${pollId}/detail`;
        const response = await axios.get(url);
        let { data } = response.data;
        setPollDetail(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCandidatesByPoll = async (pollId) => {
      try {
        const url = `http://localhost:3300/polls/${pollId}/candidates`;
        const response = await axios.get(url);
        let { data } = response.data;
        setCandidates(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPollDetail(pollId);
    fetchCandidatesByPoll(pollId);
  }, [pollId]);

  useEffect(() => {
    if (pollDetail) {
      const intervalId = setInterval(() => {
        setCountdown(calculateCountdown(pollDetail.start_time));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [pollDetail]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <h2 className="text-2xl font-bold dark:text-white mt-3 mb-8">
              Poll Information
            </h2>
            {/* PollDetail actions */}

            {pollDetail != null ? (
              <React.Fragment>
                <WelcomeBanner
                  title={pollDetail.name}
                  content={pollDetail.description}
                />
                <div className="bg-yellow-100 p-6 my-12">
                  <h2 className="text-center text-lg font-bold dark:text-primary marker">
                    Countdown to Poll Start
                  </h2>
                  <p className="text-4xl font-bold dark:text-red-500 marker text-center">
                    {countdown}
                  </p>
                </div>
                <h2 className="text-2xl font-bold dark:text-white my-3">
                  Registered Candidates for the poll
                </h2>

                {/* Cards */}
                {candidates != null ? (
                  <div className="grid grid-cols-3 gap-5 mt-5 mb-16">
                    {candidates.map((candidate) => (
                      <div
                        key={candidate.id}
                        className="bg-white rounded-[40px]"
                      >
                        <div className="relative mb-16">
                          <div className="py-24  bg-gradient-to-b from-rose-600 to-red-800 rounded-[40px]" />
                          <div className="absolute top-32 left-32">
                            <img
                              className="rounded-full border-8 object-cover object-top border-white shadow-lg w-[120px]"
                              src={image(candidate.photo)}
                            />
                          </div>
                        </div>
                        <div className="text-center my-2">
                          <div className="text-stone-900 text-2xl font-semibold font-['Poppins']">
                            {candidate.name}
                          </div>
                          <div className="text-stone-900 text-base font-semibold font-['Poppins']">
                            {candidate.poll.name}
                          </div>
                          <div className="text-stone-900 text-base font-semibold font-['Poppins']">
                           From: {candidate.platform != null ? (candidate.platform.name) : ('Independent Candidacy')}
                          </div>
                        </div>
                        <div className="w-1/2 p-[2px] rounded-full mx-auto bg-red-700" />

                        <div className="text-center text-stone-900 text-xs font-normal font-['Poppins'] px-8 mt-3 mx-auto">
                          {truncateSentenceByWords(candidate.bio, 25)}
                        </div>

                        <div className="w-6 h-6 relative"></div>
                        <div className="w-[37px] h-[37px] relative"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  "No Candidate"
                )}

                {/* Cards */}

                <h2 className="text-2xl font-bold dark:text-white my-3">
                  Registered Platforms for the poll
                </h2>

                <div className="grid grid-cols-3 gap-5 mt-5 mb-16">
                  {pollDetail.platform_details != null
                    ? pollDetail.platform_details.map((platformDetail) => (
                        <div
                          key={platformDetail.platform_id}
                          className="w-full bg-white rounded-3xl shadow border p-3 border-blue-100 flex-col justify-start items-start inline-flex"
                        >
                          <div className="relative">
                            <div className="h-[107px] md:px-[104px] lg:px-[145px]  rounded-[18px] auth justify-center items-center inline-flex">
                              <div className="text-center text-indigo-300 text-base font-semibold font-['Poppins'] leading-tight ">
                                Platform
                              </div>
                            </div>
                            <div className="absolute top-[70px] left-3">
                              <div className="w-[86px] h-[86px] relative  rounded-[999px] border-4 border-white shadow-md">
                                <img
                                  src={flag}
                                  alt="platform image"
                                  className="object-cover object-top w-full rounded-full mx-auto"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-16 mb-4 p-3">
                            <div className="flex justify-between items-center">
                              <div className="text-gray-800 text-base font-semibold font-['Poppins'] leading-tight">
                                {platformDetail.platform.name}
                              </div>
                              <div className="px-3 bg-blue-600 rounded-[99px] justify-center items-center gap-2.5 inline-flex">
                                <div className="text-white text-xs font-medium p-1 font-['Poppins'] leading-normal">
                                  Follow
                                </div>
                              </div>
                            </div>
                            <div className="text-gray-500 text-xs font-medium font-['Inter'] leading-tight mb-3">
                              @alias
                            </div>
                            <div className=" text-gray-500 text-xs font-medium font-['Inter'] leading-tight my-3">
                              {platformDetail.platform.description}
                            </div>
                            <div className=" h-5 relative">
                              <div className=" h-5 left-0 top-0 absolute">
                                <div className="left-[32px] top-0 absolute text-gray-500 text-xs font-medium font-['Inter'] leading-tight">
                                  Following
                                </div>
                                <div className="left-0 top-0 absolute text-gray-700 text-sm font-bold font-['Inter'] leading-tight">
                                  238
                                </div>
                              </div>
                              <div className=" h-5 left-[109px] top-0 absolute">
                                <div className="left-[23px] top-0 absolute text-gray-500 text-xs font-medium font-['Inter'] leading-tight">
                                  Followers
                                </div>
                                <div className="left-0 top-0 absolute text-gray-700 text-sm font-bold font-['Inter'] leading-tight">
                                  84
                                </div>
                              </div>
                            </div>
                            <div className="relative">
                              <div className="left-[18px] top-0 absolute text-blue-600 text-xs font-medium font-['Inter'] leading-tight">
                                onevote.com
                              </div>
                              <div className="w-3.5 h-3.5 left-0 top-[3px] absolute flex-col justify-start items-start inline-flex">
                                <BsBrowserEdge />
                              </div>
                            </div>
                            <div className="relative mt-5">
                              <div className="left-[18px] top-0 absolute text-slate-400 text-xs font-medium font-['Inter'] leading-tight">
                                Nigeria
                              </div>
                              <div className="w-3.5 h-3.5 left-0 top-[3px] absolute flex-col justify-start items-start inline-flex">
                                <MdOutlineLocationOn />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : "No platform added"}
                </div>
              </React.Fragment>
            ) : (
              "empty"
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default PollDetail;
