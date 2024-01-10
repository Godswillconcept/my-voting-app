import React, { useEffect, useState } from "react";
import { Timeline } from "flowbite-react";
import { HiCalendar } from "react-icons/hi";
import { Link } from "react-router-dom";
import { getPolls } from "./dashboardAPI";
import { dateFormat, truncateSentenceByWords } from "../../helpers/helper";

function DashboardPoll() {
  const [polls, setPolls] = useState([]);
  async function fetchPolls() {
    let result = await getPolls();
    console.log(result);
    setPolls(result);
  }

  useEffect(() => {
    fetchPolls();
  }, []);
  return (
    <div className="shadow rounded-xl pb-5 bg-white dark:bg-slate-950 col-span-1">
      <div className="flex justify-between items-center p-4 rounded-t-xl border-b shadow">
        <h6 className="text-lg font-medium dark:text-white">Upcoming Polls</h6>
        <Link
          to="/polls"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          See all
        </Link>
      </div>
      <div className="overflow-y-auto h-[400px]">
        <div className="px-10 py-5 ">
          {polls.length !== 0 ? (
            <>
              {polls.map((poll) => (
                <Timeline key={poll.id}>
                  <Timeline.Item>
                    <Timeline.Point icon={HiCalendar} />
                    <Timeline.Content>
                      <Timeline.Time>
                        {dateFormat(poll.start_time)}
                      </Timeline.Time>
                      <Timeline.Title>{poll.name}</Timeline.Title>
                      <Timeline.Body>{poll.description}</Timeline.Body>
                    </Timeline.Content>
                  </Timeline.Item>
                </Timeline>
              ))}
            </>
          ) : (
            <Timeline>
              <Timeline.Item>
                <Timeline.Point icon={HiCalendar} />
                <Timeline.Content>
                  <Timeline.Time>---</Timeline.Time>
                  <Timeline.Title>---</Timeline.Title>
                  <Timeline.Body>---</Timeline.Body>
                </Timeline.Content>
              </Timeline.Item>
            </Timeline>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPoll;
