"use client";

import { Check, Loader2 } from "lucide-react";

export default function Log({
	log,
	finished,
}: {
	log: {
		id: string;
		data: string;
	};
	finished: boolean;
}) {
	switch (log.id) {
		case "video":
			if (log.data) {
				return (
					<video
						className="w-full rounded-md"
						controls
						src={log.data}
					/>
				);
			}
			return (
				<div className="border-foreground/10 bg-foreground/5 flex aspect-video w-full flex-col items-center justify-center rounded-md border">
					<Loader2 className="stroke-foreground/40 animate-spin" />
				</div>
			);
		case "loading":
			return (
				<div className="flex items-center gap-2">
					{!finished ? (
						<Loader2 className="stroke-foreground/40 animate-spin" />
					) : (
						<Check />
					)}
					<p className={`${finished ? "" : "text-foreground/40"}`}>
						{log.data}
					</p>
				</div>
			);
	}
}
