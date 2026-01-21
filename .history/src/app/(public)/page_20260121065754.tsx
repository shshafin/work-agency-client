import CoreServices from "@/components/home/CoreServices";
import GlobalStats from "@/components/home/GlobalStats";
import Hero from "@/components/home/Hero";
import Sectors from "@/components/home/Sectors";
import StatsAndLegal from "@/components/home/StatsAndLegal";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      <StatsAndLegal />
      <Sectors />
      <CoreServices />
      <GlobalStats />
    </div>
  );
};

export default page;
