import React from "react";
import { TypeAnimation } from "react-type-animation";
import chart from "../../images/chart.png";
import userMgt from "../../images/user management.png";
import realtime from "../../images/real-time results.png";

function Service() {
  return (
    <div className="py-8">
      <h2 className="text-xl leading-none tracking-tight sm:text-2xl md:text-3xl lg:text-4xl dark:text-whitesemibold text-center font-semibold my-8 title">
        Our Services
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mx-8 my-12">
        <div className="bg-gray-300 h-80 rounded-xl px-3 hover:border-b-4 hover:transition-all duration-300 hover:border-primary hover:scale-90">
          <img
            src={chart}
            alt="Poll creation"
            className="h-32 w-32 pt-8 mx-auto"
          />
          <div>
            <h2 className="text-2xl font-semibold text-center py-4">
              Poll Creation
            </h2>

            <TypeAnimation
              splitter={(str) => str.split(/(?= )/)} // 'Lorem ipsum dolor' -> ['Lorem', ' ipsum', ' dolor']
              sequence={[
                "Create your polls with ease and set the stage for meaningful discussions.",
                3000,
                "",
              ]}
              speed={{ type: "keyStrokeDelayInMs", value: 30 }}
              omitDeletionAnimation={true}
              style={{
                fontSize: "1.05em",
                display: "inline-block",
                minHeight: "200px",
                textAlign: "center",
              }}
              repeat={Infinity}
            />
          </div>
        </div>
        <div className="bg-gray-300 h-80 rounded-xl px-3 hover:border-b-4 hover:transition-all duration-300 hover:border-primary hover:scale-90">
          <img
            width="94"
            height="94"
            src="https://img.icons8.com/3d-fluency/94/conference.png"
            alt="conference"
            className="h-32 w-32 pt-8 mx-auto"
          />
          <div>
            <h2 className="text-2xl font-semibold text-center py-4">
              Candidate Management
            </h2>

            <TypeAnimation
              splitter={(str) => str.split(/(?= )/)} // 'Lorem ipsum dolor' -> ['Lorem', ' ipsum', ' dolor']
              sequence={[
                "Manage political parties & candidates effortlessly.",
                3000,
                "",
              ]}
              speed={{ type: "keyStrokeDelayInMs", value: 30 }}
              omitDeletionAnimation={true}
              style={{
                fontSize: "1.05em",
                display: "inline-block",
                minHeight: "200px",
                textAlign: "center",
              }}
              repeat={Infinity}
            />
          </div>
        </div>
        <div className="bg-gray-300 h-80 rounded-xl px-3 hover:border-b-4 hover:transition-all duration-300 hover:border-primary hover:scale-90">
          <img
            src={userMgt}
            alt="Poll creation"
            className="h-32 w-32 pt-8 mx-auto"
          />
          <div>
            <h2 className="text-2xl font-semibold text-center py-4">
              Position Setup
            </h2>

            <TypeAnimation
              splitter={(str) => str.split(/(?= )/)} // 'Lorem ipsum dolor' -> ['Lorem', ' ipsum', ' dolor']
              sequence={[
                "Define positions or posts for users to vote on.",
                3000,
                "",
              ]}
              speed={{ type: "keyStrokeDelayInMs", value: 30 }}
              omitDeletionAnimation={true}
              style={{
                fontSize: "1.05em",
                display: "inline-block",
                minHeight: "200px",
                textAlign: "center",
              }}
              repeat={Infinity}
            />
          </div>
        </div>
        <div className="bg-gray-300 h-80 rounded-xl px-3 hover:border-b-4 hover:transition-all duration-300 hover:border-primary hover:scale-90">
       
          <img
            src={realtime}
            alt="Poll creation"
            className="h-32 w-32 pt-8 mx-auto"
          />
          <div>
            <h2 className="text-2xl font-semibold text-center py-4">
            Real-time Results
            </h2>

            <TypeAnimation
              splitter={(str) => str.split(/(?= )/)} // 'Lorem ipsum dolor' -> ['Lorem', ' ipsum', ' dolor']
              sequence={[
                "Experience live updates on poll results as users cast their votes.",
                3000,
                "",
              ]}
              speed={{ type: "keyStrokeDelayInMs", value: 30 }}
              omitDeletionAnimation={true}
              style={{
                fontSize: "1.05em",
                display: "inline-block",
                minHeight: "200px",
                textAlign: "center",
              }}
              repeat={Infinity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
