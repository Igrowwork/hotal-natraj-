import prismadb from '@/lib/prismadb';
import { compare } from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'


export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email:",
                    type: "text",
                },
                password: {
                    label: "Password:",
                    type: "password",
                },
            },
            async authorize(credentials) {
                //This is where we need to retrieve user data
                //to verify with credentials
                //Docs: https://next-auth.js.org/configuration/providers/credentials
                // const user = {id: "42", name: "Sujood", "password": "patanahi"};
                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                });

                if (!user) {
                    throw new Error("Invalid credentials")
                }
                const isPasswordCorrect = await compare(credentials!.password, user.password);
                if (!isPasswordCorrect) {
                    throw new Error("Invalid credentials")
                }

                return Promise.resolve({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    isAdmin: user.isAdmin,
                });
            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            // Omit sensitive information from the token
            //@ts-ignore
            user && (token.user = { id: user.id, name: user.name, email: user.email, phone: user.phone , isAdmin: user.isAdmin });
            return token;
        },
        session: async ({ session, token }) => {
            // Store only necessary information in the session
            const user = token.user;
            // @ts-ignore
            session.user = {id: user.id, name: user.name, email: user.email, phone: user.phone, isAdmin: user.isAdmin };
            return session;
        }
    }
}