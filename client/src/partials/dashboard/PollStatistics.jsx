import { Progress } from "flowbite-react";
import React from "react";

function PollStatistics() {
  return (
    <div className="grid grid-cols-3 gap-6 my-5">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index}>
          <div className="bg-white rounded-xl dark:bg-slate-950">
            <div className="p-4 border-b shadow">
              <h5 className="text-lg font-medium dark:text-white">
                Election Title
              </h5>
            </div>
            <div className="p-4 pb-6">
              <div className="flex flex-col gap-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index}>
                    <div className="text-base font-medium">Platform A</div>
                    <Progress progress={45} color="dark" />{" "}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PollStatistics;
