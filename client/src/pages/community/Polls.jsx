import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button,} from "flowbite-react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import FilterButton from "../../components/DropdownFilter";
import Datepicker from "../../components/Datepicker";
import PollModal from "../../community/polls/PollModal";
import PollTimeline from "../../community/polls/PollTimeline";

function Polls() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    // Fetch platforms from the server
    const fetchPolls = async () => {
      try {
        const url = "http://localhost:3300/polls";
        const response = await axios.get(url);
        const { data } = response.data;
        setPolls(data);
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };

    fetchPolls();
  }, []);

  const title = "All Polls 👋";
  const content = "Here is the list of all available polls";
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
            {/* Poll banner */}
            <WelcomeBanner title={title} content={content} />

            {/* Poll actions */}
            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              {/* Filter button */}
              <FilterButton />
              {/* Datepicker built with flatpickr */}
              <Datepicker />
              {/* Add view button */}
              <Button color="blue" onClick={() => setOpenModal(true)}>
                <svg
                  className="w-4 h-4 fill-current opacity-50 shrink-0 me-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span>New Poll </span>
              </Button>
              <PollModal
                openModal={openModal}
                onClose={() => setOpenModal(false)}
              />
            </div>
       
            {/* Poll timeline */}
            <PollTimeline polls={polls} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Polls;
