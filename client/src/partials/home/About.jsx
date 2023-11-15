import React from "react";

import online from "../../images/online.svg";
import calendar from "../../images/calendar.svg";
import process from "../../images/process.svg";
import booked from "../../images/booked.svg";
import annotation from "../../images/annotation.svg";
import selected from "../../images/selected.svg";

function About() {
  return (
    <div className="shadow-md">
      <div className="pb-16 pt-16 bg-amber-100">
        <h2 className="text-xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl dark:text-whitesemibold text-center title mb-5">
          About OneVote
        </h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mx-16 pt-8">
          <div className=" bg-white rounded-lg p-8 hover:border-b-4 hover:transition-all duration-300 hover:border-primary hover:scale-90">
            <img
              src={online}
              alt="about image"
              className="w-52 h-52 mx-auto"
            />
            <h2 className="text-xl font-semibold text-center pt-5 pb-3">
              Accessible Democracy
            </h2>
            <p className="text-sm text-center">
              We believe in inclusivity, ensuring that every voice counts.
            </p>
          </div>
          <div className=" bg-white rounded-lg p-8 hover:border-b-4 hover:transition-all duration-300 hover:border-primary hover:scale-90">
            <img
              src={process}
              alt="about image"
              className="w-52 h-52 mx-auto"
            />
            <h2 className="text-xl font-semibold text-center pt-5 pb-3">
              Empowering Voices
            </h2>
            <p className="text-sm text-center">
              We stand by the idea that informed choices lead to impactful
              decisions.
            </p>
          </div>
          <div className=" bg-white rounded-lg p-8 hover:border-b-4 hover:transition-all duration-300 hover:border-primary hover:scale-90">
            <img
              src={calendar}
              alt="about image"
              className="w-52 h-52 mx-auto"
            />
            <h2 className="text-xl font-semibold text-center pt-5 pb-3">
              Community of Change
            </h2>
            <p className="text-sm text-center">
              Committed to fostering togetherness and active participants for
              positive change.
            </p>
          </div>
          <div className=" bg-white rounded-lg p-8 hover:border-b-4 hover:transition-all duration-300 hover:border-primary hover:scale-90">
            <img
              src={annotation}
              alt="about image"
              className="w-52 h-52 mx-auto"
            />
            <h2 className="text-xl font-semibold text-center pt-5 pb-3">
              Informed Decision-Making
            </h2>
            <p className="text-sm text-center">
              We facilitate and provide information you need to make meaningful
              choices.
            </p>
          </div>
          <div className=" bg-white rounded-lg p-8 hover:border-b-4 hover:transition-all duration-300 hover:border-primary hover:scale-90">
            <img
              src={booked}
              alt="about image"
              className="w-52 h-52 mx-auto"
            />
            <h2 className="text-xl font-semibold text-center pt-5 pb-3">
              Inclusivity Matters
            </h2>
            <p className="text-sm text-center">
              Regardless of background or circumstance, has a platform to be
              heard.
            </p>
          </div>
          <div className=" bg-white rounded-lg p-8 hover:border-b-4 hover:transition-all duration-300 hover:border-primary hover:scale-90">
            <img
              src={selected}
              alt="about image"
              className="w-52 h-52 mx-auto"
            />
            <h2 className="text-xl font-semibold text-center pt-5 pb-3">
              United for Change
            </h2>
            <p className="text-sm text-center">
              Unite and amplify to drive positive change in our communities and
              beyond.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
