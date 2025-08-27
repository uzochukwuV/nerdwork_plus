import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/assets/nerdwork.png";

const AuthNav = () => {
  return (
    <div className="flex justify-center items-center">
      <Link href={"/"}>
        <Image src={Logo} width={146} height={40} alt="nerdwork logo" />
      </Link>
    </div>
  );
};

export default AuthNav;
