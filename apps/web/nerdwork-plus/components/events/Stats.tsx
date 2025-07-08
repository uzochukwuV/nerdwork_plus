import Image from "next/image";
import React from "react";
import Carry1st from "@/assets/sponsors/carry1st.svg";
import Itel from "@/assets/sponsors/itel.svg";
import Filmhouse from "@/assets/sponsors/filmhouse.svg";
import Tribe from "@/assets/sponsors/tribe.svg";
import Monster from "@/assets/sponsors/monster.svg";
import HOF1 from "@/assets/events/hof1.png";
import HOF2 from "@/assets/events/hof2.png";
import HOF3 from "@/assets/events/hof3.png";
import HOF4 from "@/assets/events/hof4.png";
import HOF5 from "@/assets/events/hof5.png";
import HOF6 from "@/assets/events/hof6.png";
import HOF7 from "@/assets/events/hof7.png";
import HOF8 from "@/assets/events/hof8.png";
import HOF9 from "@/assets/events/hof9.png";
import EventCard from "./EventCard";

const stats = [
  {
    first: "5000",
    second: "Attendees in 3 years",
  },
  {
    first: "300",
    second: "Registered Members",
  },
  {
    first: "20+",
    second: "Booths and Activities",
  },
  {
    first: "4Y",
    second: "Registered Members",
  },
];

export default function EventStats() {
  return (
    <section
      data-testid="events-stats"
      className="max-w-[1130px] w-full font-inter mx-auto text-white flex flex-col gap-20 px-7"
    >
      <section className="py-10">
        <div className="max-w-[706px] mx-auto md:text-center flex flex-col gap-6 items-center">
          <h2 className="font-obostar text-[40px] max-md:text-2xl">
            The Biggest IRL Meet up for Nerds Comic Enthusiasts
          </h2>
          <p className="font-semibold text-sm">
            We champion one of the biggest comic cons that showcase Africa’s
            creativity, diversity, and innovation, bringing all of geek culture
            together.
          </p>
        </div>
        <section>
          <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 md:mt-24">
            <EventCard
              title="Game Conventions"
              description="Join fellow gamers for an exciting convention filled with tournaments, demos, and the latest gaming innovations!"
              image="/events/games.jpg"
            />
            <EventCard
              title="Anime Con"
              description="Immerse yourself in anime culture with screenings, merchandise, meet-and-greets, and cosplay competitions!"
              image="/events/anime-con.jpg"
            />
            <EventCard
              title="Cosplays"
              description="Experience a day of creativity and connection at our annual community event!"
              image="/events/cosplay.jpg"
            />
          </section>
        </section>
      </section>

      <section className="md:py-10">
        <h2 className="font-obostar text-[40px] max-md:text-[32px] max-w-[706px]">
          With over 5000 Attendees in Just 5 years. We just get Bigger and
          Better
        </h2>
        <div className="md:flex max-md:grid grid-cols-2 max-md:gap-6 justify-between mt-16">
          {stats.map((stat, index) => (
            <div key={index} className="md:text-center">
              <h3 className="font-obostar bg-gradient-to-r from-white from-50% to-[#0D0D0D] to-100% bg-clip-text text-transparent text-[28px] max-md:text-lg mb-2">
                {stat.first}
              </h3>
              <p className="text-sm text-[#A9A9A9CC]">{stat.second}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SPONSORS */}
      <section
        data-testid="sponsors"
        className="md:py-10 flex flex-col max-md:gap-16 gap-20 overflow-hidden"
      >
        <p className="text-sm font-medium">Sponsors of comic con 2024.</p>
        <div className="flex justify-between gap-4 animate-marquee hover:pause">
          <Image src={Carry1st} width={49} height={48} alt="carry1st logo" />
          <Image src={Itel} width={75} height={48} alt="itel logo" />
          <Image src={Filmhouse} width={137} height={48} alt="filmhouse logo" />
          <Image src={Tribe} width={93} height={48} alt="tribe logo" />
          <Image src={Monster} width={55} height={48} alt="monster logo" />
        </div>
        <div className="flex max-md:hidden justify-between gap-4 animate-marquee-reverse hover:pause">
          <Image src={Itel} width={75} height={48} alt="itel logo" />
          <Image src={Carry1st} width={49} height={48} alt="carry1st logo" />
          <Image src={Tribe} width={93} height={48} alt="tribe logo" />
          <Image src={Filmhouse} width={137} height={48} alt="filmhouse logo" />
          <Image src={Monster} width={55} height={48} alt="monster logo" />
        </div>
        <p className="text-center mt-7 text-sm font-medium">
          Want to sponsor an event,{" "}
          <span className="underline hover:no-underline cursor-pointer">
            Contact Us
          </span>
        </p>
      </section>

      {/* HALL OF FAME */}
      <section className="py-10">
        <h2 className="font-obostar text-[40px] max-md:text-2xl md:text-center">
          Hall of Fame
        </h2>
        {/* desktop hall of fame */}
        <div className="max-md:hidden grid md:grid-cols-3 gap-6 mt-20">
          <div className="flex flex-col gap-6">
            <Image
              src={HOF1}
              width={432}
              height={535}
              alt="Hall of fame image"
            />
            <Image
              src={HOF4}
              width={432}
              height={535}
              alt="Hall of fame image"
            />
            <Image
              src={HOF7}
              width={432}
              height={535}
              alt="Hall of fame image"
            />
          </div>
          <div className="flex flex-col gap-6 -mt-10">
            <Image
              src={HOF2}
              width={432}
              height={535}
              alt="Hall of fame image"
            />
            <Image
              src={HOF5}
              width={432}
              height={535}
              alt="Hall of fame image"
            />
            <Image
              src={HOF8}
              width={432}
              height={535}
              alt="Hall of fame image"
            />
          </div>
          <div className="flex flex-col gap-6">
            <Image
              src={HOF3}
              width={432}
              height={535}
              alt="Hall of fame image"
            />
            <Image
              src={HOF6}
              width={432}
              height={535}
              alt="Hall of fame image"
            />
            <Image
              src={HOF9}
              width={432}
              height={535}
              alt="Hall of fame image"
            />
          </div>
        </div>
        {/*mobile hall of fame  */}
        <div className="md:hidden grid grid-cols-2 gap-3 mt-6">
          <div className="flex flex-col gap-3">
            <Image
              src={HOF1}
              width={432}
              height={535}
              alt="Hall of fame image"
            />
            <Image
              src={HOF4}
              width={432}
              height={535}
              alt="Hall of fame image"
            />
            <Image
              src={HOF7}
              width={432}
              height={535}
              alt="Hall of fame image"
            />
            <Image
              src={HOF3}
              width={432}
              height={535}
              alt="Hall of fame image"
            />
            <Image
              src={HOF9}
              width={432}
              height={535}
              alt="Hall of fame image"
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <Image
              src={HOF2}
              width={432}
              height={535}
              alt="Hall of fame image"
            />
            <Image
              src={HOF5}
              width={432}
              height={535}
              alt="Hall of fame image"
            />
            <Image
              src={HOF8}
              width={432}
              height={535}
              alt="Hall of fame image"
            />
            <Image
              src={HOF6}
              width={432}
              height={535}
              alt="Hall of fame image"
            />
          </div>
        </div>
      </section>
    </section>
  );
}
