import SignIn from "@/components/SignIn";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";

export default async function Home() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	return (
		<main className="flex flex-col gap-4">
			<h1>
				{session
					? `Hello ${session.user.name}`
					: "You aren't signed in"}
			</h1>
			<SignIn />
		</main>
	);
}
