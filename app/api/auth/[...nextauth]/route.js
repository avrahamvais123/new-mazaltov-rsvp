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
      authorization: { params: { prompt: "select_account" } }, // יכריח את Google לבקש בחירת חשבון בכל כניסה
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password, name } = credentials;

        // התחברות למסד הנתונים
        const client = await clientPromise;
        const db = client.db("mazaltov-rsvp").collection("users"); // השם של מסד הנתונים שלך

        // חיפוש המשתמש לפי אימייל
        const user = await db.findOne({ email });
        console.log("user: ", user);

        const createNewUser = async () => {
          const hashedPassword = await bcrypt.hash(password, 10);
          await db.insertOne({
            name,
            email,
            password: hashedPassword,
            image: "",
            createdAt: new Date(),
          });

          const updatedUser = await db.findOne({ email });
          return updatedUser;
        };

        const createPassword = async () => {
          const hashedPassword = await bcrypt.hash(password, 10);
          console.log("hashedPassword: ", hashedPassword);

          await db.updateOne({ email }, { $set: { password: hashedPassword } });
          const updatedUser = await db.findOne({ email });
          return updatedUser;
        };

        // אם נכנס פעם ראשונה באופן ידני
        if (!user) {
          const updatedUser = await createNewUser();
          return {
            id: updatedUser?._id,
            name: updatedUser?.name,
            email: updatedUser?.email,
            image: updatedUser?.image,
          };
        }

        // אם כבר נכנס דרך גוגל ואין לו סיסמה
        if (!user?.password) {
          const updatedUser = await createPassword();
          return {
            id: updatedUser?._id,
            name: updatedUser?.name,
            email: updatedUser?.email,
            image: updatedUser?.image,
          };
        }

        // אם כבר נכנס ידנית ויש לו סיסמה
        // השוואת הסיסמה המוכנסת עם הסיסמה המוצפנת במסד הנתונים
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
          console.log("סיסמה שגויה");
          return null;
        }

        // החזרת פרטי המשתמש אם האימות הצליח
        return {
          id: user?._id,
          name: user?.name,
          email: user?.email,
          image: user?.image || "",
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const client = await clientPromise;
      const db = client.db("mazaltov-rsvp").collection("users");

      console.log("user: ", user);

      // בדיקה אם המשתמש קיים כבר במסד הנתונים
      const existingUser = await db.findOne({ email: user.email });

      if (!existingUser) {
        // יצירת חשבון חדש אם לא קיים
        await db.insertOne({
          email: user?.email,
          name: user?.name,
          image: user?.image,
          createdAt: new Date(),
        });
      }

      //  עדכון התמונה אם המשתמש קיים ואין לו תמונה
      if (!existingUser?.image) {
        await db.updateOne(
          { email: user?.email },
          { $set: { image: user?.image } }
        );
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
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
});

export { handler as GET, handler as POST };
