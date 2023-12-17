import React, { useState } from "react";
import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";
import { dateFormat } from "../../helpers/helper";
import AddPlatform from "./AddPlatform";
import { Link } from "react-router-dom";

function PollTimeline({ polls }) {
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

  const handlePollDetail = (poll) => {
    return <Link to={`/polls/${poll.id}/detail`}>{poll.name}</Link>;
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
                  <Timeline.Time>{dateFormat(poll.start_time)}</Timeline.Time>
                  <Timeline.Title>
                    {handlePollDetail(poll)} 
                  </Timeline.Title>
                  <Timeline.Body>{poll.description}</Timeline.Body>
                  <Button color="blue" onClick={() => handleOpenModal(poll.id)}>
                    Add Platforms to poll
                    <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                  </Button>
                  <AddPlatform
                    openModal={openModals[poll.id] || false}
                    poll={poll}
                    onClose={() => handleCloseModal(poll.id)}
                  />
                </Timeline.Content>
              </Timeline.Item>
            </Timeline>
          </React.Fragment>
        ))
      )}
    </div>
  );
}

export default PollTimeline;
