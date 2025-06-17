import React from "react";
import { Button } from "../ui/button";

export default function Nerdwork() {
  return (
    <section className="relative min-h-screen w-full">
      <div className="absolute inset-0 bg-[url('@/assets/gallery.png')] bg-cover bg-center bg-no-repeat z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0D0D0D_0%,rgba(13,13,13,0)_40%,#0D0D0D_66%)] z-10" />
      <div className="relative z-20 text-white max-w-[1130px] h-screen mx-auto flex flex-col justify-between gap-6 font-inter py-5 text-center">
        <div className="flex flex-col gap-6">
          <h2 className="font-obostar text-[40px]">
            Redefining
            <br />
            African
            <br />
            Storytelling
          </h2>
          <p>Step into a universe of African comics like never before.</p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-[#3373D9]">Go to Nerdwork+</Button>
            <Button className="bg-[#343435]">Learn More</Button>
          </div>
        </div>
        <div>
          <h3 className="font-obostar text-[28px] mb-20">
            From Creators to Devoted
            <br />
            Readers. There&apos;s a story
            <br />
            for Everyone
          </h3>
          <section className="flex gap-16">
            <div className="flex flex-col gap-3 text-left">
              <h3 className="text-[28px] font-obostar">1</h3>
              <p className="font-semibold">Discover African Stories</p>
              <span className="text-[#FFFFFFB2]">
                Immerse yourself in authentic African narratives, from folklore
                to futuristic adventures.
              </span>
            </div>
            <div className="flex flex-col gap-3 text-left">
              <h3 className="text-[28px] font-obostar">2</h3>
              <p className="font-semibold">Better Reading Experience</p>
              <span className="text-[#FFFFFFB2]">
                Seamless, immersive, and tailored for your comfort, enjoy comics
                like never before.
              </span>
            </div>
            <div className="flex flex-col gap-3 text-left">
              <h3 className="text-[28px] font-obostar">3</h3>
              <p className="font-semibold">Creator Management</p>
              <span className="text-[#FFFFFFB2]">
                Empowering African creators with the tools to bring stories to
                life.
              </span>
            </div>
            <div className="flex flex-col gap-3 text-left">
              <h3 className="text-[28px] font-obostar">4</h3>
              <p className="font-semibold">African Focused Voice</p>
              <span className="text-[#FFFFFFB2]">
                Bringing African culture, creativity, and perspectives to the
                world.
              </span>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
