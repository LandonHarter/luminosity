"use client";

import { authClient } from "@/lib/auth/client";
import { trpcClient } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function SignIn() {
	const router = useRouter();

	return (
		<>
			<Button
				onClick={async () => {
					await authClient.signIn.social({
						provider: "google",
					});
				}}
				className="!w-fit"
			>
				Sign In
			</Button>
			<Button
				onClick={async () => {
					await authClient.signOut();
					router.refresh();
				}}
				className="!w-fit"
			>
				Sign Out
			</Button>
			<Button
				onClick={async () => {
					console.log(await trpcClient.test.query());
				}}
				className="!w-fit"
			>
				Authenticated Action
			</Button>
		</>
	);
}
