"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import useMeasure from "react-use-measure";

type Question = {
	question: string;
	answer: React.ReactNode;
};

export default function Question({ question, answer }: Question) {
	const [ref, { height }] = useMeasure();
	const [open, setOpen] = useState(false);

	return (
		<div className="border-foreground/10 bg-foreground/[0.01] mx-4 w-full max-w-[1000px] cursor-pointer rounded-xl border-[1px] px-4 transition-colors">
			<button
				onClick={() => setOpen((pv) => !pv)}
				className="flex w-full cursor-pointer items-center justify-between gap-4 py-6"
			>
				<span
					className={`font-clashGrotesk text-left text-xl transition-colors`}
				>
					{question}
				</span>
				<motion.span
					variants={{
						open: {
							rotate: "90deg",
						},
						closed: {
							rotate: "0deg",
						},
					}}
				>
					<ChevronLeft
						className={`mr-2 h-5 w-5 text-2xl transition-all ${open ? "-rotate-90" : "rotate-0"}`}
					/>
				</motion.span>
			</button>
			<motion.div
				initial={false}
				animate={{
					height: open ? height : "0px",
					marginBottom: open ? "24px" : "0px",
				}}
				className="overflow-hidden"
			>
				<p
					ref={ref}
					className="font-clashGrotesk text-foreground/60 text-[17px]"
				>
					{answer}
				</p>
			</motion.div>
		</div>
	);
}
