import React from 'react'
import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";
import { dateFormat } from '../../helpers/helper';

function PollTimeline({polls}) {
  return (
    <div className="mt-5">
    <h2 className="my-6 text-2xl md:text-3xl font-bold">All Polls</h2>
    {polls.length === 0 ? (
          <div>Add New Poll</div>
        ) : (
          polls.map((poll) => (
            <Timeline>
      <Timeline.Item>
        <Timeline.Point icon={HiCalendar} />
        <Timeline.Content>
          <Timeline.Time>{dateFormat(poll.start_time)}</Timeline.Time>
          <Timeline.Title>
            {poll.name}
          </Timeline.Title>
          <Timeline.Body>
           {poll.description}
          </Timeline.Body>
          <Button color="blue">
            Add Platforms to poll
            <HiArrowNarrowRight className="ml-2 h-3 w-3" />
          </Button>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
          ))
        )}
   
  </div>
  )
}

export default PollTimeline