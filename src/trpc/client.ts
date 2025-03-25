import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import superjson from "superjson";
import { AppRouter } from "./router";

const baseUrl =
	process.env.NEXT_PUBLIC_BASE_URL ||
	"https://luminosityai.azurewebsites.net";
export const trpcClient = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({ url: `${baseUrl}/api/trpc` }),
		loggerLink({
			enabled: (opts) => true,
		}),
	],
	transformer: superjson,
});
