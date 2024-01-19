import React from "react";
import { image } from "../../helpers/helper";
import UserThree from "../../images/members/member1.png";

function VoterCard({candidate, handleVoteChange, selectedCandidateId}) {
  return (
    <div
      className={`flex flex-col items-center bg-gray-50 shadow-sm rounded-lg p-4 transform transition duration-300 ${
        selectedCandidateId === candidate.id ? "ring-2 ring-blue-300" : ""
      } hover:scale-105`}
    >
      <img
        src={candidate.photo !== null ? image(candidate.photo) : UserThree}
        alt={`Candidate ${candidate.name}`}
        className="w-24 h-24 object-cover rounded-full mb-4"
      />
      <label className="flex items-center justify-between w-full cursor-pointer">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">
            {candidate.name} 
          </h3>
          <p className="text-sm text-gray-600">{candidate.platform !== null ? candidate.platform.name : "Independent"}</p>
        </div>
        <input
          type="checkbox"
          checked={selectedCandidateId === candidate.id}
          onChange={() => handleVoteChange(candidate)}
          className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </label>
    </div>
  );
}

export default VoterCard;
