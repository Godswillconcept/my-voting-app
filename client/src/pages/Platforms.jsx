import React, { useEffect, useState } from "react";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import FilterButton from "../components/DropdownFilter";
import Datepicker from "../components/Datepicker";
import { Button, Dropdown } from "flowbite-react";
import axios from "axios";
import PlatformModal from "../partials/platforms/PlatformModal";
import PlatformTable from "../partials/platforms/PlatformTable";
import PlatformExcelFile from "../partials/platforms/PlatformExcelFile";

function Platforms({user}) {
  const [openModal, setOpenModal] = useState(false);
  const [openPlatformExcelModal, setOpenPlatformExcelModal] = useState(false);

  const [platforms, setPlatforms] = useState([]);

  const fetchPlatforms = async () => {
    try {
      const response = await axios.get("/platforms");
      const { data } = response.data;
      setPlatforms(data);
    } catch (error) {
      console.error("Error fetching platforms:", error);
    }
  };
  useEffect(() => {
    fetchPlatforms();
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
  const content = "Here is the list of all registered platforms";

  return (
    <>
      {/* Platform banner */}
      <WelcomeBanner title={title} content={content} />

      {/* Platform actions */}
      <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
        {/* Filter button */}
        <FilterButton />
        {/* Datepicker built with flatpickr */}
        <Datepicker />
        {/* Add view button */}

       {user.role === "Admin" && <Dropdown label="Add Platform">
          <Dropdown.Item onClick={() => setOpenModal(true)}>
            Single Platform
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setOpenPlatformExcelModal(true)}>
            Upload Excel File
          </Dropdown.Item>
        </Dropdown>}
        <PlatformModal
          openModal={openModal}
          onClose={() => setOpenModal(false)}
          fetchPlatforms={fetchPlatforms}
        />
        <PlatformExcelFile
          openModal={openPlatformExcelModal}
          onClose={() => setOpenPlatformExcelModal(false)}
          fetchPlatforms={fetchPlatforms}
        />
      </div>

      {/* Platform table */}
      <PlatformTable platforms={platforms} user={user}/>
    </>
  );
}

export default Platforms;
