
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                console.log(`Auth: Attempting login for ${credentials.email}`);
                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email }
                    });

                    if (!user) {
                        console.log(`Auth: User not found - ${credentials.email}`);
                        return null;
                    }

                    console.log(`Auth: User found, checking password...`);
                    const isValid = await bcrypt.compare(credentials.password, user.password);

                    if (isValid) {
                        console.log(`Auth: Password match! SUCCESS for ${credentials.email}`);
                        return { id: user.id, name: user.name, email: user.email };
                    }

                    console.log(`Auth: Invalid password for ${credentials.email}`);
                    return null;
                } catch (error) {
                    console.error("Auth: DATABASE ERROR:", error);
                    return null;
                }
            }
        })
    ],
    jwt: {
        maxAge: 30 * 24 * 60 * 60,
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id;
                session.user.email = token.email;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET || "rvts_production_fallback_secret_998877",
    cookies: {
        sessionToken: {
            name: `rvts-auth-v2`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NEXTAUTH_URL?.startsWith('https')
            }
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
