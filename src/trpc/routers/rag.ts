import { WolframAlphaClient } from "@agentic/wolfram-alpha";
import { Pinecone } from "@pinecone-database/pinecone";
import { embed } from "ai";
import { voyage } from "voyage-ai-provider";
import { z } from "zod";
import { publicProcedure, t } from "../trpc";

const pc = new Pinecone({
	apiKey: process.env.PINECONE_API_KEY || "",
});
const embeddingModel = voyage.textEmbeddingModel("voyage-code-3", {
	outputDimension: 1024,
	outputDtype: "float",
});

const wolfram = new WolframAlphaClient({
	appId: process.env.WOLFRAM_ALPHA_APP_ID!,
});

export const ragRouter = t.router({
	findDocumentation: publicProcedure
		.input(z.string())
		.query(async ({ input }) => {
			const { embedding } = await embed({
				model: embeddingModel,
				value: input,
			});

			const result = await pc.index("docs").query({
				vector: embedding as number[],
				topK: 1,
				includeMetadata: true,
			});
			result.matches = result.matches.filter((match) => {
				return (match.score || 0) > 0.65;
			});

			return result.matches.map((match) => ({
				content: match.metadata?.content,
				id: match.id,
			}));
		}),
	findExamples: publicProcedure
		.input(
			z.object({
				query: z.string(),
				good: z.boolean(),
			})
		)
		.query(async ({ input }) => {
			const { embedding } = await embed({
				model: embeddingModel,
				value: input.query,
			});

			const result = await pc
				.index(input.good ? "examples" : "bad-examples")
				.query({
					vector: embedding as number[],
					topK: 2,
					includeMetadata: true,
				});
			result.matches = result.matches.filter((match) => {
				return (match.score || 0) > 0.65;
			});

			return result.matches.map((match) => ({
				code: match.metadata?.code,
				layout: match.metadata?.layout || "N/A",
				notes: match.metadata?.notes || "N/A",
				id: match.id,
			}));
		}),
	wolframAlpha: publicProcedure.input(z.string()).query(async ({ input }) => {
		return new Promise((resolve) => {
			wolfram
				.ask(input)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					resolve(
						"Invalid query. Unable to calculate the result. Do not try again."
					);
				});
		});
	}),
});
