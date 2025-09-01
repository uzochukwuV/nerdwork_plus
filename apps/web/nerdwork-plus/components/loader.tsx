import Image from "next/image";
import React from "react";
import Loader from "@/assets/loader.svg";

const SpinLoader = () => {
  return (
    <>
      <Image
        src={Loader}
        width={60}
        height={60}
        alt="loader"
        className="animate-spin duration-1000"
      />
    </>
  );
};

export default SpinLoader;
