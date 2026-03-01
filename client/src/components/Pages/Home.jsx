import React from "react";
import Hero from "../home/Hero";
import About from "../home/About";

 import ServicesCards from "../home/ServicesCards";
import Contact from "./Contact";
// import CountryCard from "../components/CountryCard";
// import { services } from "../data/services";
// import { countries } from "../data/countries";

const Home = () => {
  return (
    <div>
      <Hero />
      <About/>
      <ServicesCards/>
      <Contact/>

      
    </div>
  );
};

export default Home;