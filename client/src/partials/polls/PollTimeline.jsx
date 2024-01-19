import React, { useState } from "react";
import { Button, Timeline } from "flowbite-react";
import { HiCalendar } from "react-icons/hi";
import { FaLandmarkFlag } from "react-icons/fa6";
import { RiUserStarFill } from "react-icons/ri";
import { ImEye } from "react-icons/im";
import { dateFormat } from "../../helpers/helper";
import AddPlatform from "./AddPlatform";
import CandidateModal from "../candidates/CandidateModal";
import { useNavigate } from "react-router-dom";

function PollTimeline({ polls }) {
  const navigate = useNavigate();
  const [openModals, setOpenModals] = useState({});

  const handleOpenModal = (pollId) => {
    setOpenModals((prevModals) => ({
      ...prevModals,
      [pollId]: true,
    }));
  };

  const handleCloseModal = (pollId) => {
    setOpenModals((prevModals) => ({
      ...prevModals,
      [pollId]: false,
    }));
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
                  <Timeline.Time>{dateFormat(poll.start_time)} - {dateFormat(poll.end_time)}</Timeline.Time>
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
                    <Button
                      color="blue"
                      onClick={() => handleOpenModal(poll.id)}
                    >
                      Add Platforms
                      <FaLandmarkFlag size={16} className="ms-3" />
                    </Button>
                    <Button
                      color="warning"
                      onClick={() => handleOpenModal(poll.id)}
                    >
                      Add Candidates
                      <RiUserStarFill size={16} className="ms-3" />
                    </Button>
                  </div>
                </Timeline.Content>
              </Timeline.Item>
            </Timeline>
            <AddPlatform
              openModal={openModals[poll.id] || false}
              poll={poll}
              onClose={() => handleCloseModal(poll.id)}
            
            />
            <CandidateModal
              openModal={openModals[poll.id] || false}
              onClose={() => handleCloseModal(poll.id)}
            
            />
          </React.Fragment>
        ))
      )}
    </div>
  );
}

export default PollTimeline;
