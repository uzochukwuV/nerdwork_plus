"use client";

import { signOut, useSession } from "next-auth/react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Session } from "next-auth";

export interface UserContext extends Pick<Session[ "user" ], "id" | "email">{
  token?: string;
}

const defaultUserContext: UserContext = {
  id: "",
  email: undefined,
  token: undefined,
};

export const AuthContext = createContext < {
  user: UserContext;
  setUser: (user: UserContext) => void;
  logout: () => void;
}>({
  user: defaultUserContext,
  setUser: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [ user, setUser ] = useState<UserContext>(defaultUserContext);
  
  useEffect(() => {
    if (status === "authenticated" && session) {

      const updatedUser = {
        id: session.user.id ?? undefined,
        email: session.user.email ?? undefined,
        token: session.token ?? undefined,
      }

      setUser(updatedUser);
      localStorage.setItem("token", JSON.stringify(updatedUser?.token))
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
    } else {
      const storedUserContext = sessionStorage.getItem("user");

      if (storedUserContext) {
        setUser(JSON.parse(storedUserContext));
      } else {
        setUser(defaultUserContext);
      }
    }
  }, [ session, status ])
  
  const logout = () => {
    signOut({ redirect: false });
    setUser(defaultUserContext);
    sessionStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
