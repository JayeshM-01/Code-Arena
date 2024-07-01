import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from "@utils/database";
import User from "@models/user";  // Ensure User is imported correctly

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      try {
        await connectToDB();
        const sessionUser = await User.findOne({ email: session.user.email });

        if (!sessionUser) {
          throw new Error('User not found');
        }

        session.user.id = sessionUser._id.toString();
        return session;
      } catch (error) {
        console.error('Error in session callback:', error);
        return session; // Ensure session is returned even in case of error
      }
    },

    async signIn({ profile }) {
      try {
        await connectToDB();

        // Check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // If not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s+/g, "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;  // Return true to allow sign-in
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;  // Return false to deny sign-in
      }
    }
  }
});

export { handler as GET, handler as POST };
