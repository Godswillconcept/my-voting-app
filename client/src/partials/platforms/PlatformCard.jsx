import React from "react";
import flag from "../../images/emblem.jpeg";
import { MdOutlineLocationOn } from "react-icons/md";
import { BsBrowserEdge } from "react-icons/bs";

function PlatformCard({ platformDetail }) {
  return (
    <div
    className="w-full bg-white rounded-3xl shadow border p-3 border-blue-100 flex-col justify-start items-start inline-flex"
  >
    <div className="relative">
      <div className="h-[107px] md:px-[104px] lg:px-[145px]  rounded-[18px] auth justify-center items-center inline-flex">
        <div className="text-center text-indigo-300 text-base font-semibold font-['Poppins'] leading-tight ">
          Platform
        </div>
      </div>
      <div className="absolute top-[70px] left-3">
        <div className="w-[86px] h-[86px] relative  rounded-[999px] border-4 border-white shadow-md">
          <img
            src={flag}
            alt="platform image"
            className="object-cover object-top w-full rounded-full mx-auto"
          />
        </div>
      </div>
    </div>
    <div className="mt-16 mb-4 p-3">
      <div className="flex justify-between items-center">
        <div className="text-gray-800 text-base font-semibold font-['Poppins'] leading-tight">
          {platformDetail.platform.name}
        </div>
        <div className="px-3 bg-blue-600 rounded-[99px] justify-center items-center gap-2.5 inline-flex">
          <div className="text-white text-xs font-medium p-1 font-['Poppins'] leading-normal">
            Follow
          </div>
        </div>
      </div>
      <div className="text-gray-500 text-xs font-medium font-['Inter'] leading-tight mb-3">
        @alias
      </div>
      <div className=" text-gray-500 text-xs font-medium font-['Inter'] leading-tight my-3">
        {platformDetail.platform.description}
      </div>
      <div className=" h-5 relative">
        <div className=" h-5 left-0 top-0 absolute">
          <div className="left-[32px] top-0 absolute text-gray-500 text-xs font-medium font-['Inter'] leading-tight">
            Following
          </div>
          <div className="left-0 top-0 absolute text-gray-700 text-sm font-bold font-['Inter'] leading-tight">
            238
          </div>
        </div>
        <div className=" h-5 left-[109px] top-0 absolute">
          <div className="left-[23px] top-0 absolute text-gray-500 text-xs font-medium font-['Inter'] leading-tight">
            Followers
          </div>
          <div className="left-0 top-0 absolute text-gray-700 text-sm font-bold font-['Inter'] leading-tight">
            84
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="left-[18px] top-0 absolute text-blue-600 text-xs font-medium font-['Inter'] leading-tight">
          onevote.com
        </div>
        <div className="w-3.5 h-3.5 left-0 top-[3px] absolute flex-col justify-start items-start inline-flex">
          <BsBrowserEdge />
        </div>
      </div>
      <div className="relative mt-5">
        <div className="left-[18px] top-0 absolute text-slate-400 text-xs font-medium font-['Inter'] leading-tight">
          Nigeria
        </div>
        <div className="w-3.5 h-3.5 left-0 top-[3px] absolute flex-col justify-start items-start inline-flex">
          <MdOutlineLocationOn />
        </div>
      </div>
    </div>
  </div>
  );
}

export default PlatformCard;
