"use client";
import { eventsData } from "@/components/data";
import FAQ from "@/components/homepage/FAQ";
import Footer from "@/components/homepage/Footer";
import Navbar from "@/components/homepage/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React, { use } from "react";
import Carry1st from "@/assets/sponsors/carry1st.svg";
import Itel from "@/assets/sponsors/itel.svg";
import Filmhouse from "@/assets/sponsors/filmhouse.svg";
import Tribe from "@/assets/sponsors/tribe.svg";
import Link from "next/link";

const RegisterEvent = ({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) => {
  const { eventId } = use(params);
  const events = eventsData ?? [];
  const event = events.find((elect) => parseInt(eventId) === elect.id);

  const [ticketCount, setTicketCount] = React.useState<number>(1);
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const BASE_PRICE = 25000;

  const description =
    "Nerdwork is one of Nigeria’s biggest comic conventions, where all aspects of geek culture collide. It features intense gaming tournaments, thrilling cosplay competitions, and creative writing and art contests. Attendees also enjoy a variety of live onstage performances, as well as thought-provoking and engaging panel sessions led by industry experts, creators, and influencers, providing valuable insights and inspiration. The convention boasts of a diverse lineup of vendors and sponsors who contribute significantly to the growth and vibrancy of the nerd community, creating a space where creativity, innovation, and passion for all things geek thrive. Nerdwork isn’t just a convention; it's a platform where enthusiasts of all kinds can connect, showcase their skills, and contribute to the development of a thriving creative community in Africa.";

  const addTicket = (e: React.MouseEvent) => {
    e.preventDefault();
    setTicketCount((prevCount) => prevCount + 1);
  };

  const removeTicket = (e: React.MouseEvent) => {
    e.preventDefault();
    if (ticketCount > 1) {
      setTicketCount((prevCount) => prevCount - 1);
    }
  };

  const ticketPrice = ticketCount * BASE_PRICE;

  const handleTicketCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    const validValue = Math.max(1, value); // Ensure minimum of 1
    setTicketCount(validValue);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const displayedText = expanded
    ? description
    : description.substring(0, 300) + "...";

  return (
    <section className="bg-[#0D0D0D] text-white font-inter">
      <Navbar />
      <section className="relative min-h-[80vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${event?.src})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,0)_0%,#0D0D0D_83%)] z-10" />
        <section className="relative z-20 text-white h-[80vh] max-w-[1130px] mx-auto flex flex-col justify-end px-7">
          <h1 className="font-obostar text-[52px] max-md:text-[32px]">
            {event?.title}
          </h1>
          <p className="max-md:text-sm text-[#FFFFFFE5]">
            {event?.date} | Port Harcourt | 500 People attending
          </p>
        </section>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-[1130px] mx-auto my-10 px-7">
        <section className="flex flex-col gap-16">
          <div className="">
            <p className="font-semibold">INFORMATION</p>
            <div className="text-[#FFFFFFE5] text-sm flex flex-col gap-3 my-6">
              <p>{displayedText}</p>
            </div>
            <button onClick={toggleExpanded}>
              {expanded ? "View Less" : "View More"}
            </button>
          </div>
          <div className="">
            <p className="mb-6 font-semibold">ATTENDING</p>
            <div className="flex gap-6">
              <div className="flex flex-col gap-3 items-center">
                <div className="bg-[#D9D9D9] w-20 h-20 rounded-full"></div>
                <span>Odumodu</span>
              </div>
              <div className="flex flex-col gap-3 items-center">
                <div className="bg-[#D9D9D9] w-20 h-20 rounded-full"></div>
                <span>Olabode</span>
              </div>
              <div className="flex flex-col gap-3 items-center">
                <div className="bg-[#D9D9D9] w-20 h-20 rounded-full"></div>
                <span>Folasade</span>
              </div>
            </div>
          </div>
          <div>
            <p className="font-semibold uppercase mb-6">Sponsors</p>
            <div className="flex justify-between flex-wrap gap-4 ">
              <Image src={Itel} width={75} height={48} alt="itel logo" />
              <Image
                src={Carry1st}
                width={49}
                height={48}
                alt="carry1st logo"
              />
              <Image
                src={Filmhouse}
                width={137}
                height={48}
                alt="filmhouse logo"
              />
              <Image src={Tribe} width={93} height={48} alt="tribe logo" />
            </div>
          </div>
        </section>
        <form className="bg-[#141414] border border-[#262626] rounded-[20px]">
          <div className="max-md:p-5 md:p-10 flex flex-col gap-6">
            <h3 className="font-obostar text-[28px]">Register</h3>
            <Input
              type="text"
              placeholder="First Name"
              className="w-full outline-none border border-[#FFFFFF0D] ring-0 bg-[#292930]"
            />
            <Input
              type="text"
              placeholder="Last Name"
              className="w-full outline-none border border-[#FFFFFF0D] ring-0 bg-[#292930]"
            />
            <Input
              type="email"
              placeholder="Email"
              className="w-full outline-none border border-[#FFFFFF0D] ring-0 bg-[#292930]"
            />

            <p>TICKETS</p>
            <div className="border border-[#FFFFFF66] bg-[#FFFFFF05] rounded-[16px] p-5">
              <p className="font-semibold mb-2">Early Bird</p>
              <p className="text-sm text-[#FFFFFF99]">
                Connect with one of the largest nerd community
              </p>
            </div>
            <div className=" bg-[#FFFFFF05] rounded-[16px] p-5">
              <p className="font-semibold mb-2">Early Bird</p>
              <div className="text-sm text-[#FFFFFF99]">
                <p>Step into the ultimate nerdverse:</p>
                <ul className="list-disc ml-5">
                  <li>Explore exclusive comics on the Nerdwork+ platform</li>
                  <li>Attend the most exciting comic conventions</li>
                  <li>Connect with one of the largest nerd community</li>
                </ul>
              </div>
            </div>
          </div>
          <Separator className="bg-[#404040]" />
          <div className="flex justify-between items-center max-md:flex-col max-md:items-center max-md:gap-4 p-10">
            <div className="flex gap-5 items-center">
              <button
                onClick={removeTicket}
                disabled={ticketCount <= 1}
                className="bg-[#FFFFFF1A] w-[50px] h-[50px] rounded-full hover:opacity-85 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              <Input
                type="text"
                value={ticketCount}
                onChange={handleTicketCountChange}
                className="outline-none border-[#FFFFFF33] ring-0 w-10 h-10"
              />
              <button
                onClick={addTicket}
                className="bg-[#FFFFFF1A] w-[50px] h-[50px] rounded-full hover:opacity-85 cursor-pointer"
              >
                +
              </button>
            </div>
            <Button variant={"primary"}>
              <Link href={`${event?.link}`} target="_blank">
                Buy N{ticketPrice.toLocaleString()}
              </Link>
            </Button>
          </div>
        </form>
      </section>
      <FAQ />
      <Footer />
    </section>
  );
};

export default RegisterEvent;
