import { useAuthState } from "@/hooks/useAuthState";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import SpaceComponent from "./space";

export default async function SpacesPage() {
	const { user, signedIn } = await useAuthState();
	if (!signedIn) redirect("/");

	const spaces = await prisma.space.findMany({
		where: { userId: user.id },
		orderBy: {
			createdAt: "desc",
		},
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
						<SpaceComponent space={space} key={space.id} />
					))}
			</div>
		</div>
	);
}
