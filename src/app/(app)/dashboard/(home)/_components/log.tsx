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
			return <video className="w-full" controls src={log.data} />;
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
