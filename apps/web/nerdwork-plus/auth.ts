//auth.ts
import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { CustomJWT } from "./lib/types/auth";
import { User } from "./lib/types";
import { googleAuth } from "./actions/auth.actions";

const isDevelopment = process.env.NODE_ENV === "development";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  session: {
    strategy: "jwt",
  },
  debug: isDevelopment,
  callbacks: {
    async signIn({ account, profile }) {
      console.log("signIn callback triggered.");
      console.log("Account:", account);
      console.log("Profile:", profile);
      if (account?.provider === "google" && profile?.email) {
        return true;
      }
      return false;
    },
    async jwt({ token, account }) {
      if (account?.provider === "google") {
        if (!account?.id_token) {
          return token;
        }

        const response = await googleAuth(account.id_token);
        console.log("jwt callback - After API call. Response:", response);

        if (!response || response.success === false || !response.data) {
          console.error("Backend response was unsuccessful or missing data.");
          return token;
        }

        console.log("jwt callback - Final token:", token);

        const { token: backendToken, user, isNewUser } = response.data;

        return {
          ...token,
          token: backendToken,
          user,
          isNewUser,
        };
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const customToken = token as CustomJWT;

      if (customToken.user && customToken.token !== undefined) {
        session.user = {
          id: customToken.user.id,
          email: customToken.user.email,
          username: customToken.user.username,
          firstName: customToken.user.firstName,
          lastName: customToken.user.lastName,
          profilePicture: customToken.picture,
          isVerified: customToken.user.isVerified,
          googleId: customToken.user.googleId,
          role: customToken.user.role,
          isNewUser: customToken.isNewUser,
        };

        session.token = customToken.token;
        session.isNewUser = customToken.isNewUser;
      } else {
        console.warn(
          "Session token is missing user data or API token. Session will be incomplete."
        );
      }
      console.log("Final session object:", session);

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
});

declare module "next-auth" {
  interface Session {
    user: {
      id: User["id"];
      email?: User["email"];
      firstName?: User["firstName"];
      lastName?: User["lastName"];
      username?: User["username"];
      profilePicture?: User["profilePicture"];
      isVerified?: User["isVerified"];
      googleId?: User["googleId"];
      role?: User["role"];
      isNewUser?: User["isNewUser"];
    } & DefaultSession["user"];
    token?: string;
    isNewUser?: boolean;
  }
}
