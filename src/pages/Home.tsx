//import { Link } from "react-router-dom";

import FeaturedTours from "../componentes/home/FeaturedTours";
import Hero from "../componentes/hero/Hero";
import AgencyIntro from "@/componentes/home/AgencyIntro";



export default function Home() {
  return (
    <>
      <Hero />
      <AgencyIntro />
      <FeaturedTours />
    </>
  );
}
