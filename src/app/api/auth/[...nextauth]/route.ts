import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                // TEMP user (we’ll replace with DB later)
                if (
                    credentials.email === "test@example.com" &&
                    credentials.password === "password"
                ) {
                    return {
                        id: "1",
                        name: "Test User",
                        email: "test@example.com",
                    };
                }

                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
