import React, { useState } from "react";
import { Button, Modal, Timeline } from "flowbite-react";
import { HiCalendar } from "react-icons/hi";
import { FaLandmarkFlag } from "react-icons/fa6";
import { RiUserStarFill } from "react-icons/ri";
import { ImEye } from "react-icons/im";
import { dateFormat } from "../../helpers/helper";
import AttachPlatform from "./AttachPlatform";
import { useNavigate } from "react-router-dom";
import AttachCandidate from "./AttachCandidate";

function PollTimeline({ polls, user }) {
  const navigate = useNavigate();
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

  return (
    <div className="mt-5">
      <h2 className="my-6 text-2xl md:text-3xl font-bold">All Polls</h2>
      {polls.length === 0 ? (
        <div>Add New Poll</div>
      ) : (
        polls.map((poll) => (
          <React.Fragment key={poll.id}>
            <Timeline>
              <Timeline.Item>
                <Timeline.Point icon={HiCalendar} />
                <Timeline.Content>
                  <Timeline.Time>
                    {dateFormat(poll.start_time)} - {dateFormat(poll.end_time)}
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
                          <FaLandmarkFlag size={16} className="ms-3" />
                        </Button>
                        <Button
                          color="warning"
                          onClick={() => handleCandidateClick(poll)}
                        >
                          Add Candidates
                          <RiUserStarFill size={16} className="ms-3" />
                        </Button>
                      </>
                    )}
                  </div>
                </Timeline.Content>
              </Timeline.Item>
            </Timeline>
          </React.Fragment>
        ))
      )}
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

export default PollTimeline;
