import Image from "next/image";
import React from "react";
import FooterImage from "@/assets/mask-footer.png";
import Logo from "@/assets/nerdwork.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="flex items-center max-w-[1130px] mx-auto text-white font-inter">
      <section className="flex flex-col gap-6">
        <Image src={Logo} width={175} height={48} alt="footer image" />
        <p>Join to stay up to date</p>
        <form className="flex gap-3 justify-center items-stretch">
          <Input
            type="email"
            className="bg-[#17171A] outline-none border-none w-full rounded-[8px] py-2.5 pl-4 w-"
            placeholder="Email address"
          />
          <Button className="h-full bg-[#3373D9] font-inter">Sign Up</Button>
        </form>
      </section>
      <Image src={FooterImage} width={554} height={581} alt="footer image" />
      <section className="flex justify-between text-sm gap-10 -ml-10 text-[#DEDEDE9E]">
        <ul className="flex flex-col gap-3">
          <li className="text-white text-nowrap">Quick Links</li>
          <li>Home</li>
          <li>Nerdwork+</li>
          <li>Events</li>
          <li>Company</li>
        </ul>
        <ul className="flex flex-col gap-3">
          <li className="text-white text-nowrap">Company</li>
          <li>Careers</li>
          <li>Press</li>
          <li>Blog</li>
        </ul>
        <ul className="flex flex-col gap-3">
          <li className="text-white text-nowrap">Support</li>
          <li>Contact Us</li>
          <li>Cookie Policy</li>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
        </ul>
      </section>
    </footer>
  );
}
