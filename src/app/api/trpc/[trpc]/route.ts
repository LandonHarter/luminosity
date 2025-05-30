import { appRouter } from "@/trpc/router";
import { createTrpcContext } from "@/trpc/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

async function handler(req: Request) {
	return fetchRequestHandler({
		endpoint: "/api/trpc",
		req,
		router: appRouter,
		createContext: createTrpcContext,
	});
}

export { handler as GET, handler as POST };
