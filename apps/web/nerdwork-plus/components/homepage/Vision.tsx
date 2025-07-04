import React from "react";
import { Button } from "../ui/button";

export default function Vision() {
  return (
    <section className="relative lg:min-h-screen w-full">
      <div className="absolute inset-0 bg-[url('/vision.png')] bg-cover bg-center bg-no-repeat z-0 px-7" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0D0D0D_0%,rgba(13,13,13,0)_100%)] z-10" />
      <div className="relative z-20 flex flex-col items-center max-md:items-start gap-6 text-center max-md:text-left text-white max-lg:h-[75vh] h-screen max-w-[1130px] mx-auto py-20 px-7">
        <h2 className="font-obostar text-[40px] max-md:text-2xl">
          Passion meets
          <br />
          Community
        </h2>
        <p className="font-semibold max-md:text-sm">
          Where your passions bring people together. Our goal is to create the
          <br className="max-md:hidden" />
          best ecosystem for storytellers, artists, and nerds in Africa.
        </p>
        <Button variant={"primary"}>Our Vision</Button>
      </div>
    </section>
  );
}
