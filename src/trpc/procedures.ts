import { auth } from "@/lib/auth/server";
import { TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { publicProcedure } from "./trpc";

export const authorizedProcedure = publicProcedure.use(
	async ({ ctx, next }) => {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "You must be signed in to perform this action",
			});
		}

		return next({
			ctx: {
				...ctx,
				session,
			},
		});
	}
);
