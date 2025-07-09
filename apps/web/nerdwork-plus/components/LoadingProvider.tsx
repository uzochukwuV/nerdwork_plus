"use client";

import LoadingScreen from "@/components/LoadingScreen";
import { useAdvancedPageLoading as usePageLoading } from "@/hooks/usePageLoading";

interface LoadingProviderProps {
  children: React.ReactNode;
  logo?: React.ReactNode;
  logoSrc?: string;
  logoAlt?: string;
}

export default function LoadingProvider({
  children,
  logo,
  logoSrc,
  logoAlt,
}: LoadingProviderProps) {
  const isLoading = usePageLoading();

  return (
    <>
      <LoadingScreen
        isLoading={isLoading}
        logo={logo}
        logoSrc={logoSrc}
        logoAlt={logoAlt}
      />
      {children}
    </>
  );
}
