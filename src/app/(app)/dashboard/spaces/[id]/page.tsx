import prisma from "@/lib/prisma";

export default async function SpacePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const space = await prisma.space.findUnique({
		where: {
			id,
		},
	});

	return (
		<div className="flex h-full w-full flex-col items-center justify-center px-8">
			<div className="flex max-w-[1000px] -translate-y-16 flex-col gap-4">
				<video
					src={space?.video!}
					className="aspect-video w-full rounded-md"
					controls
				/>
				<h1 className="w-full text-left text-3xl font-medium">
					{space?.name.replaceAll('"', "")}
				</h1>
			</div>
		</div>
	);
}
