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
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function GenerateVideo() {
	const [prompt, setPrompt] = useState("");
	const [duration, setDuration] = useState(5);

	const formRef = useRef<HTMLFormElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		inputRef.current!.style.height = "24px";
		inputRef.current!.style.height = inputRef.current!.scrollHeight + "px";
	}, [inputRef.current, inputRef.current?.value]);

	return (
		<div className="bg-foreground/[0.0075] border-foreground/10 flex w-full flex-col gap-4 rounded-md border px-4 pt-4 pb-2">
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
			/>
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-4">
					<Select
						defaultValue="5"
						onValueChange={(value) => setDuration(parseInt(value))}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select a duration" />
						</SelectTrigger>
						<SelectContent className="-translate-x-2">
							<SelectGroup>
								<SelectItem value="1">1 minute</SelectItem>
								<SelectItem value="2">2 minutes</SelectItem>
								<SelectItem value="5">5 minutes</SelectItem>
								<SelectItem value="10">10 minutes</SelectItem>
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

						setPrompt("");
						trpcClient.generate.generateVideo
							.mutate({
								prompt,
								duration,
							})
							.then((space) => {
								console.log(space.video);
							});
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
		</div>
	);
}
