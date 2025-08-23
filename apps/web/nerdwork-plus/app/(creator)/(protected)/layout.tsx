import CreatorNav from "@/app/(creator)/_components/comics/CreatorNav";

export default function CreatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-[#171719] text-white min-h-screen">
      <CreatorNav />
      {children}
    </main>
  );
}
