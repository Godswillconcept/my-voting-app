import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import FilterButton from "../components/DropdownFilter";
import Datepicker from "../components/Datepicker";
import { Dropdown } from "flowbite-react";
import UserModal from "../partials/users/UserModal";
import UserExcelFile from "../partials/users/UserExcelFile";
import UserTable from "../partials/users/UserTable";

function Users() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openUserExcelModal, setOpenUserExcelModal] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      const { data } = response.data;
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
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
  const content = "Here is the list of all registered users";

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

              <Dropdown label="Add User">
                <Dropdown.Item onClick={() => setOpenModal(true)}>
                  Single User
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setOpenUserExcelModal(true)}>
                  Upload Excel File
                </Dropdown.Item>
              </Dropdown>

              <UserModal
                openModal={openModal}
                onClose={() => setOpenModal(false)}
                fetchUsers={fetchUsers}
              />
              <UserExcelFile
                openModal={openUserExcelModal}
                onClose={() => setOpenUserExcelModal(false)}
                fetchUsers={fetchUsers}
              />
            </div>

            <div className="my-5">
              <UserTable users={users} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Users;
