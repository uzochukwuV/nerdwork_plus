import { Metadata } from "next";
import CreatorNav from "./_components/comics/CreatorNav";
import SubNav from "./_components/comics/SubNav";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nerdworkng.com/"),
  title: "Creator Dashboard",
};

export default function CreatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-[#171719] text-white min-h-screen">
      <CreatorNav />
      <SubNav />

      {children}
    </main>
  );
}
