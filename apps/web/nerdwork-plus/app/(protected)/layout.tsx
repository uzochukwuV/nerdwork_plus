import { AuthProvider } from "@/components/providers/AuthContextProvider";
import AuthSessionProvider from "@/components/providers/AuthSessionProvider";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthSessionProvider>
        <AuthProvider>{children}</AuthProvider>
      </AuthSessionProvider>
    </div>
  );
}
