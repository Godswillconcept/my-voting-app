import React, { useEffect, useState } from "react";
import axios from "axios";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import FilterButton from "../components/DropdownFilter";
import Datepicker from "../components/Datepicker";
import { Dropdown } from "flowbite-react";
import UserModal from "../partials/users/UserModal";
import UserExcelFile from "../partials/users/UserExcelFile";
import UserTable from "../partials/users/UserTable";

function Users({user}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openUserExcelModal, setOpenUserExcelModal] = useState(false);
  const [users, setUsers] = useState([]);

  console.log('role', user.role)
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
    title = "Good Morning Champ 👋";
  } else if (hr < 17) {
    title = "Good Afternoon Champ 👋";
  } else {
    title = "Good Evening Champ 👋";
  }
  const content = "Here is the list of all registered users";

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

        {user.role === "Admin" && 
        <Dropdown label="Add User">
         <Dropdown.Item onClick={() => setOpenModal(true)}>
            Single User
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setOpenUserExcelModal(true)}>
            Upload Excel File
          </Dropdown.Item>
        </Dropdown>
        } 

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
        <UserTable users={users} data={user} />
      </div>
    </>
  );
}

export default Users;
