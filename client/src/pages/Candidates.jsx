import React, { useEffect, useState } from "react";
import axios from "axios";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import FilterButton from "../components/DropdownFilter";
import Datepicker from "../components/Datepicker";
import { Button } from "flowbite-react";
import CandidateModal from "../partials/candidates/CandidateModal";
import CandidateTable from "../partials/candidates/CandidateTable";

function Candidates({ user }) {
  const [openModal, setOpenModal] = useState(false);
  const [candidates, setCandidates] = useState([]);

  async function fetchCandidates() {
    try {
      const url = "/candidates";
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
    title = "Good Morning Champ 👋";
  } else if (hr < 17) {
    title = "Good Afternoon Champ 👋";
  } else {
    title = "Good Evening Champ 👋";
  }
  const content = "Here is the list of all registered candidates";
  return (
    <>
      {/* Inbox banner */}
      <WelcomeBanner title={title} content={content} />

      <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
        {/* Filter button */}
        <FilterButton />
        {/* Datepicker built with flatpickr */}
        <Datepicker />
        {/* Add view button */}
        {user.role ===
          "Admin" &&
          (
            <Button
              onClick={() => setOpenModal(true)}
              color="transparent"
              className="bg-blue-500 text-white"
            >
              {" "}
              Add Candidate
            </Button>
          )}
        <CandidateModal
          openModal={openModal}
          onClose={() => setOpenModal(false)}
          fetchCandidates={fetchCandidates}
        />
      </div>

      <div className="my-5">
        <CandidateTable candidates={candidates} user={user}  />
      </div>
    </>
  );
}

export default Candidates;
