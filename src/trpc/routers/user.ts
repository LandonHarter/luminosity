import prisma from "@/lib/prisma";
import { z } from "zod";
import { authorizedProcedure } from "../procedures";
import { t } from "../trpc";

export const userRouter = t.router({
	updateUser: authorizedProcedure
		.input(
			z.object({
				name: z.string().optional(),
				generating: z.boolean().optional(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return prisma.user.update({
				where: {
					id: ctx.session.user.id,
				},
				data: {
					...input,
				},
			});
		}),
});
