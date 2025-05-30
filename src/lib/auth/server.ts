import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "../prisma";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	plugins: [nextCookies()],
	user: {
		additionalFields: {
			generating: {
				type: "boolean",
			},
			prompt: {
				type: "string",
				required: false,
			},
			generatingAt: {
				type: "string",
			},
			generatingSpace: {
				type: "string",
				required: false,
			},
		},
	},
});
