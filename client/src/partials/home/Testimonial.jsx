import { Carousel, Rating } from "flowbite-react";
import React from "react";
import profile1 from "../../images/profile.svg";
import profile2 from "../../images/profile (2).svg";
import profile3 from "../../images/profile (3).svg";

function Testimonial() {
  return (
    <div className="bg-green-100 pb-8 pt-16">
      <h2 className="text-xl leading-none tracking-tight text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl dark:text-whitesemibold text-center font-semibold title mb-5">
        What Our Users Say
      </h2>
      <Carousel className="h-96">
        <div className="text-center  py-8">
          <img
            src={profile1}
            alt="testimonial"
            width="96"
            height="96"
            className="mb-3 rounded-full mx-auto shadow-lg"
          />
          <h2 className="md:text-3xl sm:text-2xl text-xl font-semibold leading-7">John Doe</h2>
          <h5 className="md:text-xl sm:text-lg text-base py-2 font-medium">Educator</h5>
          <p className="text-base md:w-1/3 sm:w-1/2 mx-auto py-2">
            OneVote made it simple for me to teach my students about the
            democratic process. It's an invaluable tool for education.
          </p>
          <Rating className="flex justify-center items-center pb">
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star filled={false} />
          </Rating>
        </div>
        <div className="text-center  py-8">
          <img
            src={profile2}
            alt="testimonial"
            width="96"
            height="96"
            className="mb-3 rounded-full mx-auto shadow-lg"
          />
          <h2 className="text-3xl font-semibold leading-7">Jane Smith</h2>
          <h5 className="text-xl py-2 font-medium">Community Leader</h5>
          <p className="text-base w-1/3 mx-auto py-2">
            OneVote helped us make important decisions in our local community.
            It's user-friendly and efficient.
          </p>
          <Rating className="flex justify-center items-center pb">
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star filled={false} />
          </Rating>
        </div>
        <div className="text-center  py-8">
          <img
            src={profile3}
            alt="testimonial"
            width="96"
            height="96"
            className="mb-3 rounded-full mx-auto shadow-lg"
          />
          <h2 className="text-3xl font-semibold leading-7">David Johnson</h2>
          <h5 className="text-xl py-2 font-medium">First-time Voter</h5>
          <p className="text-base w-1/3 mx-auto py-2">
            As a first-time voter, OneVote gave me the confidence to participate
            in the electoral process. It's user-friendly and engaging.
          </p>
          <Rating className="flex justify-center items-center pb">
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star filled={false} />
          </Rating>
        </div>
      </Carousel>
    </div>
  );
}

export default Testimonial;
