import Image from "next/image";
import React from "react";
import Logo from "@/assets/nerdwork.png";
import Google from "@/assets/socials/google.svg";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const SignUpPage = () => {
  return (
    <main className="bg-[#171719] min-h-screen w-full font-inter text-white flex flex-col items-center justify-between py-20 px-5">
      <Link href={"/"}>
        <Image src={Logo} width={146} height={40} alt="nerdwork logo" />
      </Link>

      <section className="w-full max-w-[400px] text-center flex flex-col items-center">
        <h4 className="text-2xl font-semibold">Welcome to Nerdwork+</h4>
        <p className="text-[#707073] text-sm mt-3">New here or coming back?</p>
        <Link href={"/onboarding"} className="w-full">
          <Button
            variant={"secondary"}
            className="mt-10 max-w-[352px] w-full flex items-center"
          >
            <Image src={Google} width={16} height={16} alt="Google logo" />
            Continue with Google
          </Button>
        </Link>
      </section>

      <p className="text-xs text-[#707073]">
        By continuing, you acknowledge that you have read and agree to Nerdwork
        <Link
          href={""}
          className="underline hover:no-underline px-1 transition duration-300 hover:ease-in-out"
        >
          Terms and Conditions
        </Link>{" "}
        and{" "}
        <Link
          href={""}
          className="underline hover:no-underline px-1 transition duration-300 hover:ease-in-out"
        >
          Privacy Policy
        </Link>
      </p>
    </main>
  );
};

export default SignUpPage;
