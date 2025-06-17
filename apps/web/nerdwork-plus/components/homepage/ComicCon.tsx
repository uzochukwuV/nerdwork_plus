import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import ComicCon1 from "@/assets/comic-con1.png";
import ComicCon2 from "@/assets/comic-con2.png";
import ComicCon3 from "@/assets/comic-con3.png";
import Carry1st from "@/assets/sponsors/carry1st.svg";
import Itel from "@/assets/sponsors/itel.svg";
import Filmhouse from "@/assets/sponsors/filmhouse.svg";
import Tribe from "@/assets/sponsors/tribe.svg";
import Monster from "@/assets/sponsors/monster.svg";

const stats = [
  {
    first: "5000",
    second: "Attendees",
    third: "in 3 years",
  },
  {
    first: "300",
    second: "Members",
    third: "Registered",
  },
  {
    first: "20+",
    second: "Stalls",
    third: "Booths and Activities",
  },
  {
    first: "4Y",
    second: "Running",
    third: "Registered Members",
  },
];

export default function ComicCon() {
  return (
    <section className="z-10 max-w-[1130px] w-full font-inter mx-auto text-white py-20">
      <h2 className="font-obostar text-[40px]">
        EpiC Comic-Cons
        <br />
        <span className="text-xl">&</span> IRL meetups
      </h2>
      <section className="flex w-full items-center">
        <aside className="w-1/2 flex flex-col gap-20">
          <div className="flex flex-col gap-6">
            <p>Meet your favorite creators, cosplay icons, and fellow fans</p>
            <div className="flex flex-col gap-4">
              <Button className="w-fit bg-[#3373D9]">
                Register for comic con 2025
              </Button>
              <Button className="w-fit bg-[#343435]">
                See last year&apos;s comic con
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-14">
            {stats.map((stat, index) => (
              <div key={index}>
                <h3 className="font-obostar text-[28px] mb-2">
                  {stat.first}
                  <br />
                  {stat.second}
                </h3>
                <p className="text-sm text-[#A9A9A9CC]">{stat.third}</p>
              </div>
            ))}
          </div>
        </aside>
        <div className="w-1/2">
          <Image src={ComicCon1} width={589} height={445} alt="" />
          <Image
            src={ComicCon2}
            width={589}
            height={445}
            alt=""
            className="-mt-44 -ml-32"
          />
          <Image
            src={ComicCon3}
            width={556}
            height={386}
            alt=""
            className="-mt-20"
          />
        </div>
      </section>
      <section className="mt-20 flex flex-col gap-20">
        <p className="text-sm font-medium">Sponsors of comic con 2024</p>
        <div className="flex justify-between">
          <Image src={Carry1st} width={49} height={48} alt="carry1st logo" />
          <Image src={Itel} width={75} height={48} alt="carry1st logo" />
          <Image src={Filmhouse} width={137} height={48} alt="carry1st logo" />
          <Image src={Tribe} width={93} height={48} alt="carry1st logo" />
          <Image src={Monster} width={55} height={48} alt="carry1st logo" />
        </div>
        <div className="flex justify-between">
          <Image src={Itel} width={75} height={48} alt="carry1st logo" />
          <Image src={Carry1st} width={49} height={48} alt="carry1st logo" />
          <Image src={Tribe} width={93} height={48} alt="carry1st logo" />
          <Image src={Filmhouse} width={137} height={48} alt="carry1st logo" />
          <Image src={Monster} width={55} height={48} alt="carry1st logo" />
        </div>
      </section>
    </section>
  );
}
