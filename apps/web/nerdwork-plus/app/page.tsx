import ComicCon from "@/components/homepage/ComicCon";
import Community from "@/components/homepage/Community";
import FAQ from "@/components/homepage/FAQ";
import Footer from "@/components/homepage/Footer";
import Hero from "@/components/homepage/Hero";
import Nerdwork from "@/components/homepage/Nerdwork";
import Vision from "@/components/homepage/Vision";

export default function Home() {
  return (
    <div className="bg-[#0D0D0D]">
      <Hero />
      <Community />
      <Nerdwork />
      <ComicCon />
      <Vision />
      <FAQ />
      <Footer />
    </div>
  );
}
