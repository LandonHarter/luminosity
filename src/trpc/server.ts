import { appRouter } from "./router";

export const trpcServer = appRouter.createCaller({});
