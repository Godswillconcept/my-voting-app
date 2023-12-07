import React, { useEffect, useState } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import FilterButton from "../../components/DropdownFilter";
import Datepicker from "../../components/Datepicker";
import { Button, Dropdown } from "flowbite-react";
import axios from "axios";
import PlatformModal from "../../community/platforms/PlatformModal";
import PlatformTable from "../../community/platforms/PlatformTable";
import PlatformExcelFile from "../../community/platforms/PlatformExcelFile";

function Platforms() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openPlatformExcelModal, setOpenPlatformExcelModal] = useState(false);

  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const url = "http://localhost:3300/platforms";
        const response = await axios.get(url);
        const { data } = response.data;
        console.log(data);
        setPlatforms(data);
      } catch (error) {
        console.error("Error fetching platforms:", error);
      }
    };
    fetchPlatforms();
  }, []);

  const title = "All Platforms 👋";
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
              />
              <PlatformExcelFile
                openModal={openPlatformExcelModal}
                onClose={() => setOpenPlatformExcelModal(false)}
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
