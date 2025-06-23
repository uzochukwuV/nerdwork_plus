import React from "react";
import AfricanMan from "@/assets/nerdwork+/african-man.png";
import UserIcons from "@/assets/nerdwork+/users.png";

import Image from "next/image";

const features = [
  {
    heading: "Easy to Start",
    content:
      "Adjust text size, language (English, Swahili, Yoruba), or dark mode",
  },
  {
    heading: "Grow your Audience",
    content: "Turn your ideas into panels with easy-to-use tools.",
  },
  {
    heading: "Monetise your content",
    content: "Turn your ideas into panels with easy-to-use tools.",
  },
];

export default function Stories() {
  return (
    <>
      <section className="text-white font-inter text-center max-w-[1600px] mx-auto mb-16 flex flex-col gap-20 items-center">
        <div className="flex flex-col gap-6 max-w-[606px]">
          <h2 className="font-obostar text-[40px]">Find New Stories</h2>
          <p className="font-medium">
            Read tales inspired by tradition, modern life, and bold futures. All
            crafted by African creators.
          </p>
        </div>
        <div className="h-[450px] w-full bg-[url('@/assets/nerdwork+/gallery.png')] bg-cover bg-center bg-no-repeat z-0" />
        <section className="flex justify-between gap-16 text-left max-w-[1080px]">
          <div>
            <p className="font-medium mb-1">Original N+ Comic</p>
            <p className="text-[#FFFFFF99]">
              What best describes your story. Use eye catching
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">Personalised content</p>
            <p className="text-[#FFFFFF99]">
              What best describes your story. Use eye catching
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">Expert Recommendations</p>
            <p className="text-[#FFFFFF99]">
              Bring your story to life with unique personalities.
            </p>
          </div>
        </section>
      </section>

      <section className="text-white font-inter max-w-[1130px] mx-auto py-16 flex items-center">
        <section className="w-[40%]">
          <h2 className="font-obostar text-[40px] mb-6">
            Create your Narratives
          </h2>
          <p>
            Find the community that speaks to you. Talk about storylines,
            characters and tropes with readers and creators
          </p>

          <div className="mt-24 flex flex-col gap-6">
            {features.map((feat, index) => (
              <div key={index} className="bg-[#131313] px-6 py-4 rounded-[8px]">
                <p>{feat.heading}</p>
                <p className="text-[#ADACAA]">{feat.content}</p>
              </div>
            ))}
          </div>
        </section>
        <figure className="w-[65%]">
          <Image
            src={AfricanMan}
            width={1324}
            height={1123}
            alt="black african man comic image"
          />
        </figure>
      </section>

      <section className="text-white text-center font-inter max-w-[1600px] mx-auto py-16 mb-16 flex flex-col items-center">
        <div className="max-w-[738px]">
          <h2 className="font-obostar text-[40px]">Engage with the Platform</h2>
          <p>
            Find the community that speaks to you. Talk about storylines,
            <br />
            characters and tropes with readers and creators
          </p>
        </div>
        <Image
          src={UserIcons}
          width={2344}
          height={899}
          className="-mt-20"
          alt="User icons"
        />
      </section>
    </>
  );
}
