import React, { useEffect, useState } from "react";
import male from "../images/members/member1.png";
import female from "../images/members/member2.png";
import { dateFormat, full_name, image } from "../helpers/helper";
import { IoMailOpen } from "react-icons/io5";
import { HiCalendar } from "react-icons/hi";
import { FaCalendarAlt, FaGenderless } from "react-icons/fa";
import { Modal, Timeline, Button } from "flowbite-react";
import { ImEye } from "react-icons/im";
import { FaLandmarkFlag } from "react-icons/fa6";
import { RiUserStarFill } from "react-icons/ri";
import { getPolls } from "../partials/dashboard/dashboardAPI";
import AttachPlatform from "../partials/polls/AttachPlatform";
import { useNavigate } from "react-router-dom";
import AttachCandidate from "../partials/polls/AttachCandidate";

function Profile({ user }) {
  const navigate = useNavigate();
  const [polls, setPolls] = useState([]);
  const [poll, setPoll] = useState({});
  const [openPlatformModal, setOpenPlatformModal] = useState(false);
  const [openCandidateModal, setOpenCandidateModal] = useState(false);

  const handlePlatformClick = (clickedPoll) => {
    setOpenPlatformModal(true);
    setPoll(clickedPoll);
  };

  const handleCandidateClick = (clickedPoll) => {
    setOpenCandidateModal(true);
    setPoll(clickedPoll);
  };

  const handleViewDetail = (pollId) => {
    navigate(`/${pollId}/detail`);
  };
  async function fetchPolls() {
    let result = await getPolls();
    setPolls(result);
  }

  useEffect(() => {
    fetchPolls();
  }, []);

  return (
    <div>
      <nav aria-label="Breadcrumb" className="flex gap-5">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <a href="/" className="text-blue-500">
              Home
            </a>
            <svg
              className="fill-current w-3 h-3 mx-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M5 9l7 7 7-7H5z" />
            </svg>
          </li>

          <li>
            <span className="text-gray-500">Profile</span>
          </li>
        </ol>
      </nav>
      <div className="grid grid-cols-3 gap-6 mt-5">
        <div className="col-span-1">
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md mb-5">
            <div className="flex justify-center items-center p-5">
              <img
                src={
                  user.photo !== null
                    ? image(user.photo)
                    : user.gender == "Male"
                    ? male
                    : female
                }
                alt={`User ${user.name}`}
                className="rounded-full w-11/12 hover:w-3/4 hover:duration-100 hover:scale-100 border-8 border-blue-800"
              />
            </div>
            <div className="text-center pb-5">
              <h3 className="text-2xl font-bold dark:text-white capitalize">
                {full_name(user.first_name, user.last_name)}
              </h3>
              <p className="italic dark:text-gray-200">@{user.username}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md mb-5">
            <div className="flex  items-center py-5 px-12">
              <IoMailOpen color="blue" size="25" className="me-4" />
              {user.email}
            </div>
            <hr class="w-11/12 h-[2px] mx-auto bg-gray-100 border-0 rounded dark:bg-gray-50" />
            <div className="flex items-center py-5 px-12">
              <FaGenderless color="blue" size="25" className="me-4" />
              {user.gender}
            </div>
            <hr class="w-11/12 h-[2px] mx-auto bg-gray-100 border-0 rounded dark:bg-gray-50" />
            <div className="flex items-center py-5 px-12">
              <FaCalendarAlt color="blue" size="25" className="me-4" />
              {dateFormat(user.dob)}
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-white dark:bg-gray-700 rounded-xl shadow-md mb-5">
          <div className="py-5 px-12">
            <h2 className="text-2xl font-bold dark:text-white mb-3">
              Latest Updates
            </h2>
            <div className="border-2 dark:border-gray-50 rounded-xl my-6">
              <div className="px-3">
                <h2 className="text-2xl font-bold dark:text-white px-3 my-3">
                  Latest Polls
                </h2>
                {polls.length !== 0 ? (
                  <>
                    {polls.map((poll, index) => (
                      <div className="px-5" key={index}>
                        <Timeline className="dark:text-white">
                          <Timeline.Item>
                            <Timeline.Point icon={HiCalendar} />
                            <Timeline.Content>
                              <Timeline.Time>
                                {dateFormat(poll.start_time)}
                              </Timeline.Time>
                              <Timeline.Title>{poll.name}</Timeline.Title>
                              <Timeline.Body>{poll.description}</Timeline.Body>
                              <div className="flex space-x-2">
                                <Button
                                  color="transparent"
                                  className="border-2 border-green-500 hover:border-none hover:bg-green-500 hover:text-white"
                                  onClick={() => handleViewDetail(poll.id)}
                                >
                                  View Detail
                                  <ImEye className="ml-2 h-3 w-3" />
                                </Button>
                                {user.role === "Admin" && (
                                  <>
                                    <Button
                                      color="blue"
                                      onClick={() => handlePlatformClick(poll)}
                                    >
                                      Add Platforms
                                      <FaLandmarkFlag
                                        size={16}
                                        className="ms-3"
                                      />
                                    </Button>
                                    <Button
                                      color="warning"
                                      onClick={() => handleCandidateClick(poll)}
                                    >
                                      Add Candidates
                                      <RiUserStarFill
                                        size={16}
                                        className="ms-3"
                                      />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </Timeline.Content>
                          </Timeline.Item>
                        </Timeline>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="px-10 py-5 ">
                    <Timeline>
                      <Timeline.Item>
                        <Timeline.Point icon={HiCalendar} />
                        <Timeline.Content>
                          <Timeline.Time>
                            {/* {dateFormat(poll.start_time)} */}
                            12/08/2024
                          </Timeline.Time>
                          <Timeline.Title>Election</Timeline.Title>
                          <Timeline.Body>Description</Timeline.Body>
                        </Timeline.Content>
                      </Timeline.Item>
                    </Timeline>
                  </div>
                )}
              </div>
            </div>
            <div className="border-2 dark:border-gray-50 rounded-xl my-6">
              <div className="px-3">
                <h2 className="text-2xl font-bold dark:text-white px-3 my-3">
                  Poll Vote Updates
                </h2>
            
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={openPlatformModal}
        onClose={() => setOpenPlatformModal(false)}
      >
        <Modal.Header>Attach Platform(s) to {poll.name}</Modal.Header>
        <Modal.Body>
          <AttachPlatform
            poll={poll}
            onClose={() => setOpenPlatformModal(false)}
          />
        </Modal.Body>
      </Modal>
      <Modal
        show={openCandidateModal}
        onClose={() => setOpenCandidateModal(false)}
      >
        <Modal.Header>Attach Candidate to {poll.name}</Modal.Header>
        <Modal.Body>
          <AttachCandidate
            poll={poll}
            onClose={() => setOpenCandidateModal(false)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Profile;
