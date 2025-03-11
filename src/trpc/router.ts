import { authRouter } from "./routers/auth";
import { t } from "./trpc";

export const appRouter = t.mergeRouters(authRouter);
export type AppRouter = typeof appRouter;
