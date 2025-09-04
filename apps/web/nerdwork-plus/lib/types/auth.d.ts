import { Session, type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface CustomJWT extends JWT {
  id: string;
  email?: string;
  token?: string;
  first_name?: string | null;
  last_name?: string | null;
  profile_picture?: string | null;
  is_verified?: boolean;
  isNewUser?: boolean;
  google_id?: string | null;
  role?: string;
}

export interface CustomSession extends Session {
  user: {
    id: string;
    email?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    profile_picture?: string;
    is_verified?: boolean;
    google_id?: string | null;
    role?: string;
    isNewUser?: boolean;
  };
  isNewUser?: boolean;
  expires: DefaultSession["expires"];
  token?: string;
}
