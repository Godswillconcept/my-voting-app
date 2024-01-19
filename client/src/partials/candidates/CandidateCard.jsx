import React from "react";
import { image, truncateSentenceByWords } from "../../helpers/helper";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function CandidateCard({ candidate }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden mx-auto">
      <div className="bg-gradient-to-b from-red-500 to-red-700 h-48 rounded-3xl "></div>
      <div className="-mt-24 mb-3 px-6 text-center">
        <img
          src={image(candidate.photo)}
          alt="Candidate"
          className="rounded-full border-8 border-white shadow-lg h-40 w-40 object-cover mx-auto"
        />
        <h1 className="text-lg font-semibold mt-4">{candidate.name}</h1>
        <p className="text-sm font-semibold text-gray-500">
          {" "}
          From:{" "}
          {candidate.platform != null
            ? candidate.platform.name
            : "Independent Candidacy"}
        </p>
        <div className="mt-4 mx-auto w-44 border-t-2 border-red-600 "></div>
        <p className="text-sm text-gray-700 mt-4">
          {" "}
          {truncateSentenceByWords(candidate.bio, 25)}
        </p>
        <div className="flex justify-center space-x-4 mt-4 mb-6">
          <FaInstagram className="text-red-600" />
          <FaTwitter className="text-red-600" />
          <FaFacebookF className="text-red-600" />
        </div>
      </div>
    </div>
  );
}

export default CandidateCard;
