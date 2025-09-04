//auth.d.ts
import { Session, type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface CustomJWT extends JWT {
  user: {
    id: string;
    email?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
    isVerified?: boolean;
    googleId?: string | null;
    role?: string;
    isNewUser?: boolean;
  };
  isNewUser?: boolean;
  token?: string;
}

export interface CustomSession extends Session {
  user: {
    id: string;
    email?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
    isVerified?: boolean;
    googleId?: string | null;
    role?: string;
    isNewUser?: boolean;
  };
  isNewUser?: boolean;
  expires: DefaultSession["expires"];
  token?: string;
}
