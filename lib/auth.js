import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getCollection } from "@/lib/mongoDB";

export const { auth, handlers, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    encryption: false,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
        //params: { prompt: "select_account" }
      },
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        isSignup: { label: "IsSignup", type: "isSignup" },
        name: { label: "Name", type: "name" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { name, email, password, isSignup } = credentials;
        const users = await getCollection("users");

        class CustomError extends CredentialsSignin {
          constructor(error) {
            super(error);
            this.code = error;
          }
        }

        const existingUser = await users.findOne({ email });

        // אם זו הרשמה
        if (isSignup) {
          // אם המשתמש כבר קיים מחזיר ריק
          if (existingUser) {
            throw new CustomError("המשתמש כבר קיים");
          }

          const hashedPassword = await bcrypt.hash(password, 10);
          return { name, email, password: hashedPassword };
        }

        const createPassword = async () => {
          const hashedPassword = await bcrypt.hash(password, 10);
          await users.updateOne(
            { email },
            { $set: { password: hashedPassword } }
          );
          const { _id, ...rest } = await users.findOne({ email });

          return { id: _id, ...rest };
        };

        const isPasswordCorrect = await bcrypt.compare(
          password,
          existingUser?.password
        );

        // אם אין אימייל או סיסמה
        if (!email || !password || !existingUser || !isPasswordCorrect) {
          return null;
        }

        // יוצר סיסמה חדשה, אם אין סיסמה
        if (!existingUser?.password) {
          return await createPassword();
        }

        return {
          id: existingUser?._id,
          name: existingUser?.name,
          email: existingUser?.email,
          image: existingUser?.image || "",
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      console.log("credentials: ", credentials);

      const users = await getCollection("users");

      // אם המשתמש קיים
      if (user) {
        // אם יש למשתמש חשבון ספק
        if (account?.provider) {
          // בדיקה אם קיים חשבון ספק
          const existingAccount = existingUser.accounts?.find(
            (acc) => acc.provider === account?.provider
          );

          // אם אין למשתמש חשבון ספק
          if (!existingAccount) {
            await db.updateOne(
              { email: user?.email },
              { $push: { accounts: account }, $set: { image: user?.image } }
            );
          }
        }
      }
      // אם אין משתמש קיים, יוצר משתמש חדש
      else {
        users.insertOne({
          ...user,
          accounts: [account],
          image: user?.image || profile?.image,
        });
      }

      return true;
    },
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
  logger: {
    error(code, ...message) {
      console.error("error: ", code, message);
    },
    warn(code, ...message) {
      console.warn("warn: ", code, message);
    },
    debug(code, ...message) {
      console.debug("debug: ", code, message);
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
});

//export { handler as GET, handler as POST };
