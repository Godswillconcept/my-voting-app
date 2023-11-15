import React from "react";
import logo from "../../images/voting_2 transparent.png";
import { Button, Carousel } from "flowbite-react";
import '../../css/style.css';

function Hero() {
  return (
    <div className="background h-screen text-white">
      <Carousel className="w-full mx-auto">
        <div className="flex items-center md:flex-row flex-col">
          <div className="h-full flex items-center md:pt-16">
            <div className="px-16">
              <h2 className="md:text-4xl text-3xl md:w-1/3 lg:leading-snug font-bold py-5">
                Discover Trending Polls on OneVote
              </h2>
              <p className="lg:text-xl md:text-sm md:w-2/3 md:mx-0  mx-auto text-sm font-medium leading-loose py-3">
                Welcome to OneVote, your gateway to express your opinions and
                engage with trending polls.
              </p>
              <Button className="bg-primary mb-8 px-5" pill>
                Get Started
              </Button>
            </div>
          </div>
          <div className="h-full flex items-center">
            <img src={logo} alt="one-vote logo" className="md:h-full h-32" />
          </div>
        </div>
        <div className="flex items-center md:flex-row flex-col">
          <div className="h-full flex items-center md:pt-16">
            <div className="px-16">
              <h2 className="md:text-4xl text-3xl md:w-1/3 lg:leading-snug font-bold py-5">
                OneVote, <br />
                the Ultimate Online Voting App
              </h2>
              <p className="lg:text-xl md:text-sm md:w-2/3 md:mx-0  mx-auto text-sm font-medium leading-loose py-3">
                Providing you with a finger on the pulse of the latest
                discussions and opinions
              </p>
              <Button className="bg-primary mb-8 px-5" pill>
                Get Started
              </Button>
            </div>
          </div>
          <div className="h-full flex items-center">
            <img src={logo} alt="one-vote logo" className="md:h-full h-32" />
          </div>
        </div>
        <div className="flex items-center md:flex-row flex-col">
          <div className="h-full flex items-center md:pt-16">
            <div className="px-16">
              <h2 className="md:text-4xl text-3xl md:w-1/3 lg:leading-snug font-bold py-5">
                Explore <br />a diverse range of polls
              </h2>
              <p className="lg:text-xl md:text-sm md:w-2/3 md:mx-0  mx-auto text-sm font-medium leading-loose py-3">
                Immerse yourself in the power of collective decision-making.
              </p>
              <Button className="bg-primary mb-8 px-5" pill>
                Get Started
              </Button>
            </div>
          </div>
          <div className="h-full flex items-center">
            <img src={logo} alt="one-vote logo" className="md:h-full h-32" />
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default Hero;
