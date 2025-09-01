import EventLists from "@/components/events/Events";
import EventsHero from "@/components/events/Hero";
import EventStats from "@/components/events/Stats";
import FAQ from "@/components/homepage/FAQ";
import Footer from "@/components/homepage/Footer";
import React from "react";

export default function Events() {
  return (
    <div className="bg-[#0D0D0D] !scroll-smooth">
      <EventsHero />
      <EventLists />
      <EventStats />
      <FAQ />
      <Footer />
    </div>
  );
}
