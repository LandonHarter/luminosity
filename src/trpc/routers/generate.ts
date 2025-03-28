import prisma from "@/lib/prisma";
import {
	getBadExample,
	getDocumentation,
	getExample,
	wolframAlphaTool,
} from "@/lib/tools";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createAzure } from "@ai-sdk/azure";
import { generateObject, generateText } from "ai";
import { z } from "zod";
import { authorizedProcedure } from "../procedures";
import { t } from "../trpc";

const azure = createAzure({
	baseURL: process.env.AZURE_AI_BASE_URL!,
	apiKey: process.env.AZURE_AI_API_KEY!,
	apiVersion: "2024-12-01-preview",
});
const azureMini = azure("gpt-4o-mini", {
	structuredOutputs: true,
});

const anthropic = createAnthropic({
	apiKey: process.env.ANTHROPIC_API_KEY!,
});
const claude = anthropic("claude-3-7-sonnet-20250219");

async function generateName(prompt: string) {
	return await generateText({
		model: azureMini,
		prompt: `Generate a name for the project based on the user's prompt. It should be very short, around 1-3 words. Prompt: ${prompt}`,
		maxTokens: 16,
	});
}

async function generateVideo(
	prompt: string,
	duration: number,
	colorPallette: {
		background: string;
		text: string;
		primary: string;
		accent: string;
	}
) {
	const videoCode = await generateText({
		model: claude,
		tools: {
			getDocumentation,
			getExample,
			getBadExample,
			wolframAlphaTool,
		},
		experimental_continueSteps: true,
		maxSteps: 10,
		system: `
            You are a specialized AI assistant focused on creating animations using the manim community library. Your role is to write clear, visually effective, and pedagogically sound animations in Python.
            The video should be about ${duration} minutes long and should be focused on the user's prompt.

            Core Requirements:

			Every response must include: from manim import *
			All code must be contained within a single class
			Generate only manim-related code
			If a request is unrelated to animation creation, return an empty manim scene
			The class name should ALWAYS be ManimScene
			The video must be longer than 1 second. Add self.wait(1) at the end of the scene if needed.
			If you are going to use outside libraries like random or numpy, make sure to import them. This is crucial to ensure the code runs correctly.
            Do not add any comments within the code under any circumstances.
			There are no constants defined like FRAME_X_WIDTH, FRAME_WIDTH, or anything else, do not use constants unless they are from numpy or something.

			Camera and Perspective:
			For 3D scenes, use self.camera.add_fixed_orientation_mobjects to maintain 2D text
			Never use add_fixed_in_frame_mobjects
			Ensure proper depth and perspective for 3D elements
			3D Objects like spheres should try to be rendered in a low resolution to avoid long render times
			
			Videos should be assumed to be in 2D unless specified otherwise. If the user wants a 3D animation, they will specify that in the prompt.
			You should always assume the video is in 2D unless the user specifies otherwise.
			2D videos are typically easier to create and digest, so it is recommended to keep the video in 2D unless the user specifies otherwise.

			Screen Management:
			Prevent elements from extending beyond screen boundaries
			Break long text into multiple lines
			Maintain appropriate padding around all elements
			Text should never flow off the screen, try to keep everything centralized
			Try to stay away from titles as much as possible.

			Animation Flow:
			Keep scenes concise (few seconds per concept)
			Prefer ReplacementTransform over new line transitions
			Present one step per screen (e.g., one equation, one concept)
			If you are plugging in values, use ReplacementTransform to update the text
			Clear screen between all steps
			Allow sufficient time for each step's comprehension
			
			Visual Elements:
			Incorporate relevant visual aids (graphs, shapes, diagrams)
			Use LaTeX for any mathematical notation
			Break lines with \n instead of \\n
			Avoid special characters - use LaTeX or spelled-out alternatives (e.g., sqrt() instead of √ or x^2 instead of x²)
			Do not use unicode characters under any circumstance, only use latex.

            Graphs:
            Try to avoid putting a label on a point unless necessary. It usually leads to overlap with the function, but if you do decide to put a label on a point, make sure it is clear and not overlapping with the function.

			Geometry:
			You should try to always use the BetterPolygon or BetterRegularPolygon class from the manim-kodisc library when dealing with any shapes that are not circles (ex. triangles, squares, etc.)
			The class provides many benefits and is easier to use than the default manim Polygon class.
			Never, use the default manim Polygon, Rectangle, Square, etc. classes. Always use the BetterPolygon or BetterRegularPolygon class from the manim-kodisc library.
			For constructing an angle between two lines, use the Angle class from manim.
			
			Text and Layout:
			Use appropriate text sizing and spacing
			Center-align titles and important text
			If there is a visual element, there should never under any circumstance be more than 2 text elements on the screen at once. This is crucial to ensure the video is visually effective.
			Make sure to use """ for multi-line strings
			Elements should never overlap, unless it is a specific design choice
			If you are unable to add anything else to the scene without overlapping, you should always clear the screen and fade in new elements.
			To ensure no elements overlap:
				- Using proper spacing with .next_to() or .arrange()
				- Adding sufficient padding between elements and the edge of the screen
				- Checking positions before adding new elements
				- THIS IS VERY IMPORTANT, DO NOT LET ELEMENTS OVERLAP
			If you want to move something to the the side of the screen, try group.to_edge(LEFT) or group.to_edge(RIGHT) to move it to the left or right side of the screen respectively.reen.

			Overlapping:
			Text should never overlap with other text or elements. This is crucial to ensure the text is readable.
			To prevent overlapping, use appropriate spacing and padding between elements.
			Make sure to check the positions of all elements before adding new ones to ensure they do not overlap.
			If you are unable to add anything else to the scene without overlapping, try clearing the screen and starting fresh.
			It may also help to keep text sizes small to prevent overlapping, especially if there is a lot of text on the screen.
			Additionally, if you have a long string of text, you should break it to ensure it doesn't flow off the screen.
			It might also help to limit the number of elements you have on the screen. Listen to the layout instructions and make sure to follow them to the best of your ability.

			Colors and Styling:
			Whenever you need to use a color, ALWAYS USE ManimColor.from_hex(hex: str)
			There is no exception to this rule.

			For Algebraic or Mathematical Concepts:
			Show step-by-step transformations
			Include relevant visualizations
			Clear screen between major algebraic steps
			Use LaTeX for proper mathematical formatting

			Timing:
			Don't be afraid to use self.wait() for a few seconds to allow the viewer to process the information. This is crucial to ensure the video is visually effective.
			Especially when clearing the screen and starting fresh, it is important the user is able to understand the last concept before moving on to the next one.
			Even when bringing new things on to the screen, writing new bullet points, or showing new equations, it is important to give the viewer time to process the information (maybe about 2-3+ seconds)

            Shapes and Geometry:
            I recommend avoiding classes like Square, Triangle, Square, etc. and using the Polygon class instead. This will allow you to create any shape you need.
            However, use classes like Circle, Ellipse, etc. when needed.
            This is to ensure that you can create any shape you need without being limited by the classes available.

			Outside Libraries:
			If you are using any outside libraries including manim related libraries, make sure to import them. Ex. from manim_physics import *
			You have access to the following manim libraries:
			- manim-physics
			- manim-chemistry
			- manim-circuit
			- manim_ml
			- manim-kodisc

			Manim Kodisc:
			manim-kodisc is a library that has a lot of useful and random animations for you to use. You can use this library to create animations that are visually effective and engaging.
			For example, you can use this library to create animations that show:
			- Slope Fields
			- Particle Simulation
			- Force Diagrams
			- Web Images
			- BetterPolyon and BetterRegularPolygon
			- ... and much more
			If you ever see manim-kodisc in an example, always search the documentation for it. This will ensure you are using it correctly.

			Manim Chemistry:
			Whenever you are given a prompt even somewhat related to chemistry, try to use manim-chemistry to help. This library creates beautiful chemical animations that are visually effective.
			For example, you can use this library to create animations that show:
			- Molecular Structures
			- 3D Molecules
			- Bohr Models
			- Orbital Diagrams
			- ... and much more
			Whenever you need to draw a chemical structure, never use a local mol or sdf file, always use manim-chemistry's pubchem tools. This will allow you to draw any molecule you want.
			Always check the documentation for manim-chemistry before using it. This will ensure you are using it correctly.
			You also have access to "elements.csv" for periodic table integration.
			When drawing chemical structures, if in 2D, you should almost always use MMoleculeObject over GraphMolecule.

			Documentation and Examples:
			You can and should fetch documentation and examples to aid you in writing code. You can call each tool (getDocumentation, getExample, getBadExample) with a broad and general query that will return helpful information.
			Documentation fetches documentation for manim and related libraries. Examples fetches example code snippets. Bad examples fetches code snippets that are incorrect or not visually appealing.
			This is highly recommended when writing code for manim plugin libraries like manim-physics, manim-chemistry, manim-circuit, manim_ml, and manim-kodisc.
			You are limited to 2 documentation calls, 2 example calls, and 1 bad example call. Use them wisely.

			Wolfram Alpha:
			You can use the Wolfram Alpha tool to get exact answers to mathematical problems. You can call the tool with a query and it will return the exact answer to the problem.

			Tool Usage:
			You are to use all tools before providing your response. Because the tool response contains information you need to write the code, you should always use the tool before writing the code.

            VERY IMPORTANT NOTE:
			- Do not return anything other than manim code, for example, "Ok! I will make this video for you" or "I will start..." is not allowed. Even at the end, don't say "I did this for you" or "I hope you like it". Just end the code with a self.wait(1) and that's it. That is a very hard requirement.
            - Don't do more than the user asks. Do exactly what the user tells you to do unless very vague. 
            For example, the user might say "draw the function ..." and your response should only include you drawing the function, noting extra.
            The user is requesting something, so you should only do what they ask for or else you will disappoint them and waste their time and money.
            REMEMBER, RETURN VALID PYTHON MANIM CODE, NOTHING ELSE.
        `,
		prompt,
	});
	let parsedText = videoCode.text;
	parsedText = parsedText.replace("```python", "");
	parsedText = parsedText.replace("```", "");
	if (!parsedText.startsWith("from manim import *")) {
		const index = parsedText.indexOf("from manim import *");
		parsedText = parsedText.slice(index);
	}
	return parsedText;
}

async function generateStructure(prompt: string, duration: number) {
	const { object } = await generateObject({
		model: azureMini,
		prompt: `Generate a structure for an educational video based on the user's prompt. 
		You will create a list of scenes, within each will have a separate prompt about how to layout the scene and an approximate duration (in minutes) for the scene. 
		The video should be around ${duration} minutes long.
		This is not like a full form youtube video, just a quick demo/explanation video for a concept.
		
		Prompt: ${prompt}`,
		schema: z.object({
			scenes: z.array(
				z.object({
					prompt: z.string(),
					duration: z.number(),
				})
			),
		}),
	});

	return object;
}

async function renderVideo(code: string) {
	const data = new FormData();
	data.append("code", code);
	data.append("className", "ManimScene");

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/render/video`,
		{
			body: data,
			method: "POST",
		}
	);

	if (response.ok) {
		const json = await response.json();
		return json.video as string;
	}

	console.error("Error rendering video");
	return null;
}

async function stitchVideo(videos: string[]) {
	const data = new FormData();
	const newVideos = videos.filter((video) => video !== "");
	data.append("videos", JSON.stringify(newVideos));
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/render/stitch`,
		{
			body: data,
			method: "POST",
		}
	);
	const json = await response.json();
	console.log(json);
	return json.video as string;
}

export const generateRouter = t.router({
	generateVideo: authorizedProcedure
		.input(
			z.object({
				prompt: z.string(),
				duration: z.number(),
				spaceId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const space = await prisma.space.create({
				data: {
					id: input.spaceId,
					name: "",
					video: "",
					userId: ctx.session.user.id,
				},
			});

			const userId = ctx.session.user.id;
			await prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					generating: true,
					generatingAt: new Date(),
					prompt: input.prompt,
					generatingSpace: space.id,
				},
			});

			const name = await generateName(input.prompt);
			const structure = await generateStructure(
				input.prompt,
				input.duration
			);

			const numProgressPoints = structure.scenes.length * 2 + 1;
			const progressIncrement = 1 / numProgressPoints;
			let progress = 0;

			const getRandomColor = () => {
				const colors = [
					"#FFFEE0",
					"#D5F6FB",
					"#ADB2D4",
					"#D5E5D5",
					"#EEF1DA",
					"#B5828C",
					"#FFB4A2",
					"#E5989B",
					"#FFCDB2",
					"#FFD3B5",
					"#FFDFD3",
				];
				return colors[Math.floor(Math.random() * colors.length)];
			};

			const colorPallette = {
				background: "#000000",
				text: "#FFFFFF",
				primary: getRandomColor(),
				accent: getRandomColor(),
			};

			const generatePromises = [] as Promise<string>[];
			for (const scene of structure.scenes) {
				const generatePromise = new Promise<string>(async (resolve) => {
					const code = await generateVideo(
						scene.prompt,
						scene.duration,
						colorPallette
					);
					progress += progressIncrement;
					resolve(code);
				});
				generatePromises.push(generatePromise);
			}
			const codes = await Promise.all(generatePromises);

			const renderPromises = [] as Promise<string>[];
			for (let i = 0; i < codes.length; i++) {
				const renderPromise = new Promise<string>(async (resolve) => {
					const video = await renderVideo(codes[i]);
					progress += progressIncrement;
					resolve(video || "");
				});
				renderPromises.push(renderPromise);
			}
			const videos = await Promise.all(renderPromises);

			const stitchedVideo = await stitchVideo(videos);
			progress += progressIncrement;

			const updatedSpace = await prisma.space.update({
				where: {
					id: space.id,
				},
				data: {
					name: name.text,
					video: stitchedVideo,
				},
			});

			await prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					generating: false,
					generatingAt: null,
					prompt: null,
					generatingSpace: null,
				},
			});

			return updatedSpace;
		}),
	getSpaceStatus: authorizedProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			async function checkStatus() {
				return await prisma.space.findUnique({
					where: {
						id: input,
					},
					select: {
						video: true,
					},
				});
			}

			let index = 0;
			while (true) {
				index += 1;
				if (index > 25) {
					break;
				}
				await new Promise((resolve) => setTimeout(resolve, 15000));
				const video = await checkStatus();

				if (!video) {
					return null;
				}

				if (video.video) {
					return video;
				}
			}

			await prisma.user.update({
				where: {
					id: ctx.session.user.id,
				},
				data: {
					generating: false,
					generatingAt: null,
					prompt: null,
					generatingSpace: null,
				},
			});
			return null;
		}),
});
