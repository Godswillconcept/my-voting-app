import React from "react";

import Hero from "../../partials/home/Hero";
import Header from "../../partials/home/Header";
import About from "../../partials/home/About";
import Service from "../../partials/home/Service";
import Testimonial from "../../partials/home/Testimonial";
import Faq from "../../partials/home/Faq";

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Faq />
      <Service />
      <Testimonial />
    </>
  );
}

export default Home;
