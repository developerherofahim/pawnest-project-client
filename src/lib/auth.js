import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db('pawnestDatabase');

export const auth = betterAuth({

    baseURL: process.env.BETTER_AUTH_URL,

    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        },
    },
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google"], // add providers you trust
        },
    },
    session:{
        cookieCache: {
            enabled: true,
            strategy:'jwt',
            maxAge: 60*24*60*60
        }
    },
    plugins: [
        jwt(), 
    ]
},
);