import { initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import superjson from "superjson";

export async function createTrpcContext(opts: FetchCreateContextFnOptions) {
	return {};
}

type Context = Awaited<ReturnType<typeof createTrpcContext>>;
export const t = initTRPC.context<Context>().create({
	transformer: superjson,
});
export const publicProcedure = t.procedure;
