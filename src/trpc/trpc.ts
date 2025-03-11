import { initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getSessionCookie } from "better-auth/cookies";
import superjson from "superjson";

export async function createTrpcContext(opts: FetchCreateContextFnOptions) {
	const sessionCookie = getSessionCookie(opts.req);
	return {
		sessionCookie: sessionCookie,
	};
}

type Context = Awaited<ReturnType<typeof createTrpcContext>>;
export const t = initTRPC.context<Context>().create({
	transformer: superjson,
});
export const publicProcedure = t.procedure;
