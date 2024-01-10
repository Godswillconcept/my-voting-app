import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import FilterButton from "../components/DropdownFilter";
import Datepicker from "../components/Datepicker";
import { Button } from "flowbite-react";
import CandidateModal from "../partials/candidates/CandidateModal";
import CandidateTable from "../partials/candidates/CandidateTable";

function Candidates() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [candidates, setCandidates] = useState([]);

  async function fetchCandidates() {
    try {
      const url = "http://localhost:3300/candidates";
      const response = await axios.get(url);
      const { data } = response.data;
      setCandidates(data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  }
  useEffect(() => {
    fetchCandidates();
  }, []);

  const dt = new Date();
  const hr = dt.getHours();
  let title;

  if (hr < 12) {
    title = "Good Morning Acme Inc. 👋";
  } else if (hr < 17) {
    title = "Good Afternoon Acme Inc. 👋";
  } else {
    title = "Good Evening Acme Inc. 👋";
  }
  const content = "Here is the list of all registered candidates";
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
            {/* Inbox banner */}
            <WelcomeBanner title={title} content={content} />

            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              {/* Filter button */}
              <FilterButton />
              {/* Datepicker built with flatpickr */}
              <Datepicker />
              {/* Add view button */}

              <Button
                onClick={() => setOpenModal(true)}
                color="transparent"
                className="bg-blue-500 text-white"
              >
                {" "}
                Add Candidate
              </Button>
              <CandidateModal
                openModal={openModal}
                onClose={() => setOpenModal(false)}
                fetchCandidates={fetchCandidates}
              />
            </div>

            <div className="my-5">
              <CandidateTable candidates={candidates} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Candidates;
