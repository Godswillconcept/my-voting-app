import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import FilterButton from "../components/DropdownFilter";
import Datepicker from "../components/Datepicker";
import PollModal from "../partials/polls/PollModal";
import PollTimeline from "../partials/polls/PollTimeline";

function Polls({ user }) {
  const [openModal, setOpenModal] = useState(false);
  const [polls, setPolls] = useState([]);

  const fetchPolls = async () => {
    try {
      const url = "/polls";
      const response = await axios.get(url);
      const { data } = response.data;
      setPolls(data);
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };
  useEffect(() => {
    fetchPolls();
  }, []);

  const dt = new Date();
  const hr = dt.getHours();
  let title;

  if (hr < 12) {
    title = "Good Morning Champ 👋";
  } else if (hr < 17) {
    title = "Good Afternoon Champ 👋";
  } else {
    title = "Good Evening Champ 👋";
  }
  const content = "Here is the list of all available polls";
  return (
    <>
      {/* Poll banner */}
      <WelcomeBanner title={title} content={content} />

      {/* Poll actions */}
      <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
        {/* Filter button */}
        <FilterButton />
        {/* Datepicker built with flatpickr */}
        <Datepicker />
        {/* Add view button */}
        {user.role === "Admin" && (
          <Button color="blue" onClick={() => setOpenModal(true)}>
            <svg
              className="w-4 h-4 fill-current opacity-50 shrink-0 me-2"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span>New Poll </span>
          </Button>
        )}
        <PollModal
          openModal={openModal}
          onClose={() => setOpenModal(false)}
          fetchPolls={fetchPolls}
        />
      </div>

      {/* Poll timeline */}
      <PollTimeline polls={polls} user={user} />
    </>
  );
}

export default Polls;
