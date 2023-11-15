import React from "react";
import profile1 from "../../images/profile.svg";
import { Button } from "flowbite-react";

function VoteAnalysis() {
  return (
    <div className="mx-32 my-12">
      <div className="text-center">
        <h5 className="md:text-xl sm:text-lg text-base leading-snug font-medium py-8">
          Presidential Poll
        </h5>
        <h2 className="text-xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl">
          Who do you want to be your Next President?
        </h2>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 mt-12 mb-6">
        <div className="flex flex-col px-6 py-6 bg-green-500 rounded-lg">
          <div className="flex justify-between text-white">
            <h4 className="mb-24 lg:text-2xl md:text-xl font-bold">QWT</h4>
            <h4 className="mb-24 lg:text-2xl md:text-xl font-bold">123</h4>
          </div>
          <div className="p-3">
            <img
              src={profile1}
              alt="candidate image"
              className="mx-auto rounded-full border-2"
            />
          </div>
        </div>
        <div className="flex flex-col px-6 py-6 bg-red-500 rounded-lg">
          <div className="flex justify-between text-white">
            <h4 className="mb-24 lg:text-2xl md:text-xl font-bold">QWT</h4>
            <h4 className="mb-24 lg:text-2xl md:text-xl font-bold">123</h4>
          </div>
          <div className="p-3">
            <img
              src={profile1}
              alt="candidate image"
              className="mx-auto rounded-full border-2"
            />
          </div>
        </div>
        <div className="flex flex-col px-6 py-6 bg-yellow-300 rounded-lg">
          <div className="flex justify-between text-white">
            <h4 className="mb-24 lg:text-2xl md:text-xl font-bold">QWT</h4>
            <h4 className="mb-24 lg:text-2xl md:text-xl font-bold">123</h4>
          </div>
          <div className="p-3">
            <img
              src={profile1}
              alt="candidate image"
              className="mx-auto rounded-full border-2"
            />
          </div>
        </div>
        <div className="flex flex-col px-6 py-6 bg-blue-500 rounded-lg">
          <div className="flex justify-between text-white">
            <h4 className="mb-24 lg:text-2xl md:text-xl font-bold">QWT</h4>
            <h4 className="mb-24 lg:text-2xl md:text-xl font-bold">123</h4>
          </div>
          <div className="p-3">
            <img
              src={profile1}
              alt="candidate image"
              className="mx-auto rounded-full border-2"
            />
          </div>
        </div>
        <div className="flex flex-col px-6 py-6 bg-indigo-500 rounded-lg">
          <div className="flex justify-between text-white">
            <h4 className="mb-24 lg:text-2xl md:text-xl font-bold">QWT</h4>
            <h4 className="mb-24 lg:text-2xl md:text-xl font-bold">123</h4>
          </div>
          <div className="p-3">
            <img
              src={profile1}
              alt="candidate image"
              className="mx-auto rounded-full border-2"
            />
          </div>
        </div>
        <div className="flex flex-col px-6 py-6 bg-pink-500 rounded-lg">
          <div className="flex justify-between text-white">
            <h4 className="mb-24 lg:text-2xl md:text-xl font-bold">QWT</h4>
            <h4 className="mb-24 lg:text-2xl md:text-xl font-bold">123</h4>
          </div>
          <div className="p-3">
            <img
              src={profile1}
              alt="candidate image"
              className="mx-auto rounded-full border-2"
            />
          </div>
        </div>
      </div>
      <button className="bg-green-500 w-full lg:w-1/4 md:3/4 sm:w-2/4 py-2 text-white md:text-xl sm:text-lg text-base px-6 rounded-full hover:bg-green-800 hover:border-4 border-green-400" href="/poll-detail">
        Vote Analysis
      </button>
    </div>
  );
}

export default VoteAnalysis;
