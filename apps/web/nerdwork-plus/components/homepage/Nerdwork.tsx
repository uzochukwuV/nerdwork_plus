import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const features = [
  {
    id: 1,
    title: "Discover African Stories",
    content:
      "Immerse yourself in authentic African narratives, from folklore to futuristic adventures.",
  },
  {
    id: 2,
    title: "Better Reading Experience",
    content:
      "Seamless, immersive, and tailored for your comfort, enjoy comics like never before.",
  },
  {
    id: 3,
    title: "Excellent Creator Management",
    content:
      "Empowering African creators with the tools to bring stories to life.",
  },
  {
    id: 4,
    title: "African Focused Voice",
    content:
      "Bringing African culture, creativity, and perspectives to the world.",
  },
];

export default function Nerdwork() {
  return (
    <section data-testid="nerdwork" className="relative min-h-screen w-full">
      <div className="absolute inset-0 bg-[url('/gallery.png')] bg-cover md:bg-center bg-no-repeat z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0D0D0D_0%,rgba(13,13,13,0)_40%,#0D0D0D_66%)] z-10" />
      <div className="relative z-20 text-white max-w-[1130px] min-h-screen mx-auto flex flex-col justify-between max-lg:gap-64 gap-6 font-inter py-5 px-7 text-center">
        <div className="flex flex-col gap-6">
          <h2 className="font-obostar text-[40px] max-md:text-2xl">
            Redefining
            <br />
            African
            <br />
            Storytelling
          </h2>
          <p className="max-md:text-sm">
            Step into a universe of African comics like never before.
          </p>
          <div className="flex gap-4 max-md:w-full justify-center">
            <Link href={"/nerdwork+"}>
              <Button variant={"primary"}>Go to Nerdwork+</Button>
            </Link>
            <Link href={"/nerdwork+"}>
              <Button>Learn More</Button>
            </Link>
          </div>
        </div>
        <div>
          <h3 className="font-obostar text-[28px] max-md:text-lg max-md:text-left max-md:mb-8 mb-20">
            From Creators to Devoted
            <br />
            Readers. There&apos;s a story
            <br />
            for Everyone
          </h3>
          <section className="flex max-md:flex-col max-md:gap-6 gap-16">
            {features.map((feat) => (
              <div
                key={feat.id}
                className="flex max-md:flex-row flex-col gap-3 text-left"
              >
                <h4 className="text-[28px] max-md:text-lg font-obostar">
                  {feat.id}
                </h4>
                <div className="">
                  <p className="font-semibold max-md:text-sm">{feat.title}</p>
                  <span className="text-[#FFFFFFB2] max-md:text-[13px]">
                    {feat.content}
                  </span>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </section>
  );
}
