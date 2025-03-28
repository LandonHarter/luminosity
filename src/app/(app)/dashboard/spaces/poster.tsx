"use client";

import { useEffect, useState } from "react";

// @ts-ignore
import videoFrames from "video-frames";

export default function SpacePoster({
	videoUrl,
	name,
}: {
	videoUrl: string;
	name: string;
}) {
	const [poster, setPoster] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const frames = await videoFrames({
					url: videoUrl,
					offsets: [1],
					format: "image/png",
				});
				if (frames.length > 0) {
					setPoster(frames[0].image);
				}
			} catch (e) {
				setPoster(
					`https://dummyimage.com/1024x576/000/fff.png&text=${name}`
				);
			}
		})();
	}, [videoUrl]);

	return (
		<img
			src={poster || undefined}
			className="aspect-video w-full rounded-md"
		/>
	);
}
