import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import FilterButton from "../components/DropdownFilter";
import Datepicker from "../components/Datepicker";
import { Button, Dropdown } from "flowbite-react";
import axios from "axios";
import PlatformModal from "../partials/platforms/PlatformModal";
import PlatformTable from "../partials/platforms/PlatformTable";
import PlatformExcelFile from "../partials/platforms/PlatformExcelFile";

function Platforms() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    title = "Good Morning Acme Inc. 👋";
  } else if (hr < 17) {
    title = "Good Afternoon Acme Inc. 👋";
  } else {
    title = "Good Evening Acme Inc. 👋";
  }
  const content = "Here is the list of all registered platforms";

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
            {/* Platform banner */}
            <WelcomeBanner title={title} content={content} />

            {/* Platform actions */}
            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              {/* Filter button */}
              <FilterButton />
              {/* Datepicker built with flatpickr */}
              <Datepicker />
              {/* Add view button */}

              <Dropdown label="Add Platform">
                <Dropdown.Item onClick={() => setOpenModal(true)}>
                  Single Platform
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setOpenPlatformExcelModal(true)}>
                  Upload Excel File
                </Dropdown.Item>
              </Dropdown>
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
            <PlatformTable platforms={platforms} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Platforms;
