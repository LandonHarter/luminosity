"use client";

import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { trpcClient } from "@/trpc/client";
import { createId } from "@paralleldrive/cuid2";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Log from "./log";

export default function GenerateVideo({
	isGenerating,
	generatingAt,
	generatingPrompt,
	space,
}: {
	isGenerating: boolean;
	generatingAt: Date | null;
	generatingPrompt: string | null;
	space: string | null;
}) {
	const [prompt, setPrompt] = useState(generatingPrompt || "");
	const [duration, setDuration] = useState(1);
	const [startedGeneration, setStartedGeneration] = useState<Date | null>(
		generatingAt
	);

	const formRef = useRef<HTMLFormElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);

	const [generating, setGenerating] = useState(isGenerating);
	const [finishedGenerating, setFinishedGenerating] = useState(false);

	const [logs, setLogs] = useState<
		{
			id: string;
			data: any;
		}[]
	>([]);

	useEffect(() => {
		inputRef.current!.style.height = "24px";
		inputRef.current!.style.height = inputRef.current!.scrollHeight + "px";
	}, [inputRef.current, inputRef.current?.value]);

	useEffect(() => {
		if (isGenerating && space) {
			setLogs((prev) => [
				...prev,
				{
					id: "loading",
					data: "Generating video",
				},
			]);

			trpcClient.generate.getSpaceStatus.query(space).then((res) => {
				if (!res) {
					toast.error("Failed to generate video.");
					setGenerating(false);
					setFinishedGenerating(true);
					return;
				}
				setLogs((prev) => [
					...prev,
					{
						id: "video",
						data: (res as any).video,
					},
				]);
			});
		}
	}, []);

	return (
		<div className="relative flex w-full max-w-[800px] flex-col items-center justify-center gap-8">
			<div
				className={`absolute flex w-full flex-col items-center gap-8 ${generating && "pointer-events-none"}`}
			>
				<motion.h1
					className="text-center text-4xl font-medium"
					initial={{
						opacity: 0,
						y: 20,
					}}
					animate={{
						opacity: generating ? 0 : 1,
						y: generating ? -20 : 0,
					}}
				>
					What do you want to know?
				</motion.h1>
				<motion.div
					className="bg-foreground/[0.0075] border-foreground/10 flex w-full flex-col gap-4 rounded-md border px-4 pt-4 pb-2"
					initial={{
						opacity: 0,
						y: 20,
					}}
					animate={{
						opacity: generating ? 0 : 1,
						y: generating ? -20 : 0,
					}}
					transition={{
						delay: 0.1,
					}}
				>
					<textarea
						className="w-full resize-none bg-transparent outline-0"
						placeholder="Ask anything..."
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
						maxLength={250}
						onKeyDown={(e) => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault();
								formRef.current?.requestSubmit();
							} else if (e.key === "Enter" && e.shiftKey) {
								setPrompt((prev) => prev + "\n");
							}
						}}
						ref={inputRef}
						disabled={generating}
					/>
					<div className="flex w-full items-center justify-between">
						<div className="flex items-center gap-4">
							<Select
								defaultValue="1"
								onValueChange={(value) =>
									setDuration(parseInt(value))
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select a duration" />
								</SelectTrigger>
								<SelectContent className="-translate-x-2">
									<SelectGroup>
										<SelectItem value="1">
											1 minute
										</SelectItem>
										<SelectItem value="2">
											2 minutes
										</SelectItem>
										<SelectItem value="3">
											3 minutes
										</SelectItem>
										<SelectItem value="4">
											4 minutes
										</SelectItem>
										<SelectItem value="5">
											5 minutes
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<form
							className="flex translate-x-1 items-center gap-4"
							action={async () => {
								if (!prompt) {
									toast.warning("Please enter a prompt.");
									return;
								}

								const spaceId = createId();

								trpcClient.generate.generateVideo
									.mutate({
										spaceId,
										prompt,
										duration,
									})
									.then((res) => {
										setLogs((prev) => [
											...prev,
											{
												id: "video",
												data: res.video,
											},
										]);
										setFinishedGenerating(true);
									});
								setLogs((prev) => [
									...prev,
									{
										id: "loading",
										data: "Generating video",
									},
								]);

								setGenerating(true);
							}}
							ref={formRef}
						>
							<Button
								className="bg-[var(--primary-blue)] text-white hover:bg-[var(--primary-blue)] hover:brightness-110"
								type="submit"
							>
								<Send />
							</Button>
						</form>
					</div>
				</motion.div>
			</div>
			<div
				className={`absolute flex min-h-screen w-full flex-col gap-8 py-16 ${!generating && "pointer-events-none"}`}
			>
				<motion.h1
					initial={{
						opacity: 0,
						y: 20,
					}}
					animate={{
						opacity: generating ? 1 : 0,
						y: generating ? 0 : 20,
					}}
					transition={{
						delay: 0.2,
					}}
					className="text-3xl font-medium"
				>
					{prompt}
				</motion.h1>
				{logs.map((log, i) => (
					<motion.div
						key={log.id + i}
						initial={{
							opacity: 0,
							y: 20,
						}}
						animate={{
							opacity: generating ? 1 : 0,
							y: generating ? 0 : 20,
						}}
					>
						<Log log={log} finished={finishedGenerating} />
					</motion.div>
				))}
			</div>
		</div>
	);
}
