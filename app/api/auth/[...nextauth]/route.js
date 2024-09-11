import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongoDB"; // כאן תוודא שהנתיב לקובץ החיבור נכון

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
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
        const { email, password } = credentials;

        // התחברות למסד הנתונים
        const client = await clientPromise;
        const db = client.db("mazaltov-rsvp"); // השם של מסד הנתונים שלך
        const usersCollection = db.collection("users");

        // חיפוש המשתמש לפי אימייל
        const user = await usersCollection.findOne({ email });

        if (!user) {
          console.log("המשתמש לא נמצא");
          return null;
        }

        // השוואת הסיסמה המוכנסת עם הסיסמה המוצפנת במסד הנתונים
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
          console.log("סיסמה שגויה");
          return null;
        }

        // החזרת פרטי המשתמש אם האימות הצליח
        return { id: user._id, name: user.name, email: user.email };
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
