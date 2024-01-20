import React, { useState } from "react";


import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import DashboardPoll from "../partials/dashboard/DashboardPoll";
import DashboardItem from "../partials/dashboard/DashboardItem";
import DashboardUsers from "../partials/dashboard/DashboardUsers";
import PollStatistics from "../partials/dashboard/PollStatistics";

function Dashboard() {
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

  const content = "Here is what’s happening with your projects today:";
  return (
    <>
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
    </>
  );
}

export default Dashboard;
