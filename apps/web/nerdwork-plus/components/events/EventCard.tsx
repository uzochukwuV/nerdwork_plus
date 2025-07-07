"use client";
import { useState, useEffect } from "react";

type EventCardProps = {
  title: string;
  description: string;
  image: string;
};

const EventCard = ({ title, description, image }: EventCardProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const handleClick = () => {
    if (isMobile) setIsActive((prev) => !prev);
  };

  const gradientBase =
    "bg-[linear-gradient(180deg,rgba(13,13,13,0)_53.03%,rgba(13,13,13,0.9)_88.77%)]";
  const gradientHover =
    "bg-[linear-gradient(180deg,rgba(13,13,13,0.2)_0%,rgba(13,13,13,0.95)_100%)]";

  return (
    <div
      onClick={handleClick}
      className="group px-5 pb-10 relative flex flex-col justify-end rounded-[12px] cursor-pointer transition-all duration-300 bg-cover bg-center bg-no-repeat w-full h-[350px] md:h-[628px]"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 z-10 transition-all duration-300 ${
          isMobile
            ? isActive
              ? gradientHover
              : gradientBase
            : `${gradientBase} group-hover:${gradientHover}`
        }`}
      />

      <div className="z-20 relative">
        <p
          className={`font-semibold transition-all duration-300 transform ${
            isMobile
              ? isActive
                ? "-translate-y-24"
                : ""
              : "group-hover:-translate-y-24"
          }`}
        >
          {title}
        </p>
        <p
          className={`text-[#FFFFFFCC] absolute bottom-1 transition-all duration-300 transform ${
            isMobile
              ? isActive
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-full"
              : "opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
