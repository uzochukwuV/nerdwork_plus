'use client';

import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode, useState, useEffect } from "react";


interface AuthProviderProperties {
  children: ReactNode;
}

function AuthSessionChecker({ children }: AuthProviderProperties) {
  const { status } = useSession();
  const [ isLoading, setIsLoading ] = useState(true);
  
  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [ status ])
  
  if (isLoading) {
    return (
      <></>
    );
  }

  return <>{ children }</>
}

export default function AuthSessionProvider({ children }: AuthProviderProperties) {
  return (
    <SessionProvider>
      <AuthSessionChecker>
        {children}
      </AuthSessionChecker>
    </SessionProvider>
  );
}