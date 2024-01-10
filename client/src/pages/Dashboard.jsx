import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import UserThree from "../images/members/member1.png";

import DashboardPoll from "../partials/dashboard/DashboardPoll";
import DashboardItem from "../partials/dashboard/DashboardItem";
import DashboardUsers from "../partials/dashboard/DashboardUsers";
import PollStatistics from "../partials/dashboard/PollStatistics";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const content = "Here is what’s happening with your projects today:";
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
            {/* Welcome banner */}
            <WelcomeBanner title={title} content={content} />
            {/* Dashboard actions */}

            {/* Cards */}

            <div className="grid grid-cols-4 gap-3 my-5">
              <DashboardItem />
            </div>
            <div className="grid grid-cols-3 gap-6 my-5">
              <DashboardPoll />
              <DashboardUsers />
            </div>
            <PollStatistics />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
