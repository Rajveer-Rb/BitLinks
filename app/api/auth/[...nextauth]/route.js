// import NextAuth from 'next-auth'
// import GithubProvider from 'next-auth/providers/github'
// const User = require('@/models/user');
// import connectDB from '@/db/connection';

// const handler = NextAuth({
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//         if (account.provider === "github") {
//             await connectDB();
    
//             const currentUser = await User.findOne({ email: email });
//             if (!currentUser) {
//                 const newUser = await User.create({
//                     email: user.email,
//                     username: user.email.split("@")[0],
//                 });
//             }
//             return true;
//         }
//     },
//     async session({session, user, token}) {
//       const dbUser = await User.findOne({email: session.user.email})
//       console.log(dbUser)
//       session.user.name = dbUser.username
//       return  session
//     },
//   },
//   debug: true,
// })

// export { handler as GET, handler as POST };

// gpt:
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import connectDB from '@/db/connection';
const User = require('@/models/user');

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === 'github') {
        await connectDB();
        const currentUser = await User.findOne({ email: user.email });
        if (!currentUser) {
          await User.create({
            email: user.email,
            username: user.email.split('@')[0],
          });
        }
        return true;
      }
      return false;
    },
    async session({ session }) {
      await connectDB();
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.name = dbUser.username;
      }
      return session;
    },
  },
  debug: true,
});

export { handler as GET, handler as POST };




