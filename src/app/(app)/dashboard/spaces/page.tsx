import { useAuthState } from "@/hooks/useAuthState";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SpacesPage() {
	const { user, signedIn } = await useAuthState();
	if (!signedIn) redirect("/");

	const spaces = await prisma.space.findMany({
		where: { userId: user.id },
	});

	return (
		<div className="flex flex-col gap-4">
			<div className="ml-4 flex w-full flex-col gap-2">
				<h1 className="text-3xl font-semibold">Spaces</h1>
				<p className="text-foreground/50 text-lg">
					View all your past generations here!
				</p>
			</div>
			<div className="grid grid-cols-5 gap-6">
				{spaces
					.filter((space) => space.video)
					.map((space) => (
						<Link
							href={`/dashboard/spaces/${space.id}`}
							key={space.id}
						>
							<div className="flex w-full cursor-pointer flex-col gap-4 rounded-md p-4">
								<video
									src={space.video!}
									className="aspect-video w-full rounded-md"
								/>
								<h2 className="text-lg font-bold">
									{space.name.replaceAll('"', "")}
								</h2>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
}
