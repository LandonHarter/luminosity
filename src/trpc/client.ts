import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import superjson from "superjson";
import { AppRouter } from "./router";

export const trpcClient = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({ url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/trpc` }),
		loggerLink({
			enabled: (opts) => true,
		}),
	],
	transformer: superjson,
});
