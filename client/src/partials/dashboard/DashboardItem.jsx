import React from "react";
import { FaPoll } from "react-icons/fa";

function DashboardItem() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-950 p-4 rounded-xl dark:text-dark shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <h6 className="text-lg font-medium dark:text-white">Projects</h6>
            <div className="bg-blue-200 rounded-md p-2">
              <FaPoll size="26px" />
            </div>
          </div>
          <h3 className="text-3xl font-bold dark:text-white">18</h3>
          <p className="text-gray-500 dark:text-gray-400">2 completed</p>
        </div>
      ))}
    </>
  );
}

export default DashboardItem;
