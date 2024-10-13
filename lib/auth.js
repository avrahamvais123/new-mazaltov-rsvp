import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getCollection } from "@/lib/mongoDB";

export const { auth, handlers, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
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
        const usersCollection = await getCollection("users");

        // שגיאה מותאמת אישית
        class CustomError extends CredentialsSignin {
          constructor(error) {
            super(error);
            this.code = error;
          }
        }

        const existingUser = await usersCollection.findOne({ email });

        // אם זו הרשמה
        if (isSignup) {
          // אם המשתמש כבר קיים מחזיר ריק
          if (existingUser) {
            throw new CustomError("כבר קיים משתמש עם אימייל זה");
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          // יוצר משתמש חדש
          await usersCollection.insertOne({
            name,
            email,
            password: hashedPassword,
          });

          // מקבל את המשתמש החדש ומחזיר אותו לפונקציה הבאה
          const { _id, ...rest } = await usersCollection.findOne({ email });

          return { id: _id, image: "", accounts: [], ...rest };
        }

        // אם זו כניסה והמשתמש אינו נמצא במערכת
        if (!existingUser) {
          throw new CustomError("לא נמצא משתמש עם אימייל זה");
        }

        const isPasswordCorrect = await bcrypt.compare(
          password,
          existingUser?.password
        );

        // הסיסמה אינה נכונה
        if (!isPasswordCorrect) {
          throw new CustomError("הסיסמה אינה נכונה");
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
      // שגיאה מתאמת אישית
      class CustomError extends CredentialsSignin {
        constructor(error) {
          super(error);
          this.code = error;
        }
      }

      const usersCollection = await getCollection("users");

      const existingUser = await usersCollection.findOne({
        email: user?.email,
      });

      // אם זו כניסה והמשתמש לא קיים במערכת
      if (!credentials?.isSignup && !existingUser) {
        throw new CustomError("לא נמצא משתמש עם אימייל זה");
      }

      // אם המשתמש קיים
      if (existingUser) {
        // אם יש למשתמש חשבון ספק
        if (account?.provider) {
          // בדיקה אם קיים חשבון ספק
          const existingAccount = existingUser.accounts?.find(
            (acc) => acc.provider === account?.provider
          );

          // אם אין למשתמש חשבון ספק
          if (!existingAccount) {
            await usersCollection.updateOne(
              { email: user?.email },
              { $push: { accounts: account }, $set: { image: user?.image } }
            );
          }
        }
      }

      return true;
    },
    // NOTE - פונקציה שמקבלת את העדכון של הטוקן והסשן ומחזירה אותם אל הפונקציה סשן
    async jwt({ token, account, user, trigger, session }) {
      if (trigger === "update") {
        console.log("token from jwt: ", token);
        token.user = session.user;
        return { ...token };
      }

      if (account) {
        token.accessToken = account.accessToken;
      }

      const usersCollection = await getCollection("users");
      const existingUser = await usersCollection.findOne({
        email: user?.email,
      });

      if (user) {
        token.user = user;
        token.user.id = existingUser?._id;
        if (existingUser?.image) {
          token.user.image = existingUser?.image;
        }
        if (existingUser?.name) {
          token.user.name = existingUser?.name;
        }
      }

      return token;
    },
    // NOTE - פונקציה שמקבלת את הטוקן והסשן ומחזירה אותם אל המשתמש
    async session({ token, session }) {
      session.accessToken = token?.accessToken;
      session.user = token?.user;

      return session;
    },
  },
  /* cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "None", // הגדרה זו מאפשרת שימוש בעוגיות צד שלישי
        secure: true, // הכרחי על מנת להשתמש ב-SameSite None
      },
    },
  }, */
  logger: {
    error(code, ...message) {
      //console.error("error: ", code, message);
    },
    warn(code, ...message) {
      //console.warn("warn: ", code, message);
    },
    debug(code, ...message) {
      //console.debug("debug: ", code, message);
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
});
