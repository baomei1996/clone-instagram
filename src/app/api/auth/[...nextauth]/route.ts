import NextAuth, { Awaitable, DefaultSession, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

interface SessionWithUsername extends DefaultSession {}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    secret: process.env.SECRET,
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        session({ session, token, user }) {
            session.user.username = session.user.name
                ?.split(" ")
                .join("")
                .toLocaleLowerCase();
            session.user.uid = token.sub;
            return session;
        },
    },
});

export { handler as GET, handler as POST };
