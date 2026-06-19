import NextAuth from "next-auth";

import Google from "next-auth/providers/google";

import Credentials from "next-auth/providers/credentials";

import { PrismaAdapter } from "@auth/prisma-adapter";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";


export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({

  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  providers: [

    Google({
      clientId:
        process.env.AUTH_GOOGLE_ID!,

      clientSecret:
        process.env.AUTH_GOOGLE_SECRET!,
    }),


    Credentials({

      credentials: {
        email: {},
        password: {},
      },


      async authorize(credentials) {

        const user =
          await prisma.user.findUnique({
            where: {
              email: credentials.email as string,
            },
          });


        if (!user) {
          return null;
        }


        if (!user.password) {
          return null;
        }


        const isValid =
          await bcrypt.compare(
            credentials.password as string,
            user.password
          );


        if (!isValid) {
          return null;
        }


        return user;
      },

    }),

  ],


  callbacks: {

    async session({
      session,
      token,
    }) {


      if (session.user) {

        session.user.id =
          token.sub!;


        session.user.role =
          token.role as string;

      }


      return session;
    },


    async jwt({ token }) {


      const user =
        await prisma.user.findUnique({

          where: {
            email: token.email!,
          },

        });


      if (user) {

        token.role =
          user.role;

      }


      return token;

    },

  },

});