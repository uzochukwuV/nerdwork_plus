import AuthNav from "../_components/AuthNav";

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-[#171719] text-white min-h-screen py-16">
      <AuthNav />
      {children}
    </main>
  );
}
