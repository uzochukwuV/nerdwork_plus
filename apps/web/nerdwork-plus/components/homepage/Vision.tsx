import React from "react";
import { Button } from "../ui/button";

export default function Vision() {
  return (
    <section className="relative min-h-screen w-full">
      <div className="absolute inset-0 bg-[url('@/assets/vision.png')] bg-cover bg-center bg-no-repeat z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0D0D0D_0%,rgba(13,13,13,0)_100%)] z-10" />
      <div className="relative z-20 flex flex-col items-center gap-6 text-center text-white h-screen max-w-[1130px] mx-auto py-20">
        <h2 className="font-obostar text-[40px]">
          Passion meets
          <br />
          Community
        </h2>
        <p className="font-semibold">
          Where your passions bring people together. Our goal is to create the
          <br />
          best ecosystem for storytellers, artists, and nerds in Africa.
        </p>
        <Button className="bg-[#3373D9]">Our Vision</Button>
      </div>
    </section>
  );
}
