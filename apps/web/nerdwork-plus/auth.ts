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

        console.log(
          "jwt callback - Before API call. ID Token:",
          account.id_token
        );

        const response = await googleAuth(account.id_token);

        console.log("jwt callback - After API call. Response:", response);

        if (!response || response.success === false || !response.data) {
          return token;
        }

        console.log("jwt callback - Final token:", token);

        // This line is crucial for passing the API token to the session
        token.token = response.data.data.token;
        return {
          ...token,
          ...response.data.data,
        };
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const customToken = token as CustomJWT;

      // Map the custom token properties to the session user object
      session.user = {
        id: customToken.id,
        email: customToken.email,
        first_name: customToken.first_name,
        last_name: customToken.last_name,
        profile_picture: customToken.picture,
        is_verified: customToken.is_verified,
        google_id: customToken.google_id,
        role: customToken.role,
        isNewUser: customToken.isNewUser,
      };

      // Expose the API token for use in other parts of the app (e.g., API calls)
      session.token = customToken.token;
      // session.isNewUser = customToken.isNewUser

      console.log("session callback triggered. Token:", token);
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
      first_name?: User["first_name"];
      last_name?: User["last_name"];
      profile_picture?: User["profile_picture"];
      is_verified?: User["is_verified"];
      google_id?: User["google_id"];
      role?: User["role"];
      isNewUser?: User["isNewUser"];
    } & DefaultSession["user"];
    token?: string;
  }
}
