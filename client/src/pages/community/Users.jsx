import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import UserCard from "../../community/users/UserCard";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";

function Users() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const url = "http://localhost:3300/users";
        const response = await axios.get(url);
        const { data } = response.data;
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  const title = "All Users 👋";
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
            <WelcomeBanner title={title} content={content}/>

            <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
              {users.map((user) => {
                return <UserCard key={user.id} user={user} />;
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Users;
