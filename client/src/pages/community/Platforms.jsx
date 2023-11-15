import React, { useEffect, useState } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import FilterButton from "../../components/DropdownFilter";
import Datepicker from "../../components/Datepicker";
import { Button } from "flowbite-react";
import axios from "axios";
import PlatformModal from "../../community/platforms/PlatformModal";
import PlatformTable from "../../community/platforms/PlatformTable";

function Platforms() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [platform, setPlatform] = useState({
    name: "",
    description: "",
    emblem: "",
  });
  const [platforms, setPlatforms] = useState([]);

  const handleChange = (e) => {
    if (e.target.name === "emblem") {
      setPlatform({
        ...platform,
        emblem: e.target.files[0], // Store the file itself, not the filename
      });
    } else {
      const { name, value } = e.target;
      setPlatform((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(platform);
    const formData = new FormData();
    formData.append("name", platform.name);
    formData.append("description", platform.description);
    formData.append("emblem", platform.emblem);

    // sending the information to the database

    try {
      const url = "http://localhost:3300/platforms/platform";
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for FormData
        },
      });
      console.log(response.data);
      await fetchPlatforms();
    } catch (error) {
      console.log({ status: "failed", data: error });
    }
    // clearing form field
    setPlatform({
      name: "",
      description: "",
      emblem: "",
    })
    setOpenModal(false);
  };

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
  useEffect(() => {
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
              <Button color="blue" onClick={() => setOpenModal(true)}>
                Add Platform
              </Button>
              <PlatformModal
                openModal={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={handleSubmit}
                platform={platform}
                handleChange={handleChange}
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
