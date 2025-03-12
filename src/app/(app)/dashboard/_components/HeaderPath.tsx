"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function HeaderPath() {
	const path = usePathname();
	const parts = path.substring(path.startsWith("/") ? 1 : 0).split("/");

	return (
		<div className="flex items-center gap-2">
			<span className="text-foreground/40 text-sm">/</span>
			{parts.map((part, i) => (
				<Fragment key={i}>
					<span
						className={`text-sm ${i === parts.length - 1 ? "text-foreground" : "text-foreground/40"}`}
					>
						{part}
					</span>
					{i !== parts.length - 1 && (
						<span className="text-foreground/40 text-sm">/</span>
					)}
				</Fragment>
			))}
		</div>
	);
}
