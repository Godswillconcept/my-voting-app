import React from "react";
import Header from "../../partials/home/Header";
import PollItem from "../../partials/polls/PollItem";
import PollHero from "../../partials/polls/PollHero";
import Faq from "../../partials/home/Header";

function Polls() {
  return (
    <>
      <Header />
      <PollHero />
      <PollItem />
      <Faq />
    </>
  );
}

export default Polls;
