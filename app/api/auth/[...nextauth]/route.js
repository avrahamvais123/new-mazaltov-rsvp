import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // כאן תוכל לבדוק את אימות המשתמש
        /* const user = await someLoginFunction(
          credentials.email,
          credentials.password
        ); */

        const user = false;

        if (user) {
          // אם האימות הצליח, החזר את פרטי המשתמש
          return { id: user.id, name: user.name, email: user.email };
        } else {
          // אם האימות נכשל, החזר null
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.accessToken;
      }
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

export { handler as GET, handler as POST };
