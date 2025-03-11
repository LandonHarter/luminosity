import { authorizedProcedure } from "../procedures";
import { t } from "../trpc";

export const authRouter = t.router({
	test: authorizedProcedure.query(async ({ ctx }) => {
		return {
			message: `Hello ${ctx.session?.user.name}`,
		};
	}),
});
