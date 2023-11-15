import React from "react";

import coverImage from "../../images/background.png";
import { calculateAge, full_name, image } from "../../helpers/helper";



function UserCard({ user }) {
  return (
    <div className="bg-white rounded-xl pb-8">
      <div className="h-32 overflow-hidden rounded-t-xl">
        <img
          src={coverImage}
          alt="user image"
          className="object-cover object-top w-full"
        />
      </div>
      <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img
          className="object-cover object-center h-32"
          src={image(user.photo)}
          alt="user image"
        />
      </div>
      <div className="text-center mt-2">
        <h2 className="font-semibold capitalize">
          {full_name(user.first_name, user.last_name)}
        </h2>
        <p className="text-gray-500">{user.email}</p>
      </div>
      <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
        <li className="flex flex-col items-center justify-around">
        <svg
            className="w-4 fill-current text-blue-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
          </svg>
          <div className="capitalize">{user.gender}</div>
        </li>
      
        <li className="flex flex-col items-center justify-around">
          <svg
            className="w-4 fill-current text-blue-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
          </svg>
          <div>{user.phone}</div>
        </li>
      </ul>
    </div>
  );
}

export default UserCard;
