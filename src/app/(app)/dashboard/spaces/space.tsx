"use client";

import { Space } from "@prisma/client";
import Link from "next/link";
import SpacePoster from "./poster";

export default function SpaceComponent({ space }: { space: Space }) {
	return (
		<Link href={`/dashboard/spaces/${space.id}`}>
			<div className="flex w-full cursor-pointer flex-col gap-4 rounded-md p-4">
				<SpacePoster
					videoUrl={space.video!}
					name={space.name.replaceAll('"', "")}
				/>
				<h2 className="text-lg font-bold">
					{space.name.replaceAll('"', "")}
				</h2>
			</div>
		</Link>
	);
}
