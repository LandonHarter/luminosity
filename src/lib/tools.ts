import { trpcClient } from "@/trpc/client";
import { tool } from "ai";
import { z } from "zod";

export const getDocumentation = tool({
	description: "Get documentation for manim or any related manim library",
	parameters: z.object({
		query: z.string(),
	}),
	execute: async ({ query }) => {
		const results = await trpcClient.rag.findDocumentation.query(query);
		return results;
	},
});

export const getExample = tool({
	description: "Get good example code from a query (string)",
	parameters: z.object({
		query: z.string(),
	}),
	execute: async ({ query }) => {
		const results = await trpcClient.rag.findExamples.query({
			query,
			good: true,
		});
		return results;
	},
});

export const getBadExample = tool({
	description:
		"Get bad example code (visually ineffective) from a query (string)",
	parameters: z.object({
		query: z.string(),
	}),
	execute: async ({ query }) => {
		const results = await trpcClient.rag.findExamples.query({
			query,
			good: false,
		});
		return results;
	},
});

export const wolframAlphaTool = tool({
	description:
		"Calculate mathematical expressions and get the step-by-step solution",
	parameters: z.object({
		query: z.string(),
	}),
	execute: async ({ query }) => {
		const result = await trpcClient.rag.wolframAlpha.query(query);
		return result;
	},
});
