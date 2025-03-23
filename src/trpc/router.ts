import { generateRouter } from "./routers/generate";
import { ragRouter } from "./routers/rag";
import { userRouter } from "./routers/user";
import { t } from "./trpc";

export const appRouter = t.router({
	user: userRouter,
	generate: generateRouter,
	rag: ragRouter,
});
export type AppRouter = typeof appRouter;
