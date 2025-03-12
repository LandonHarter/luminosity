"use client";

import { authClient } from "@/lib/auth/client";
import { Button } from "../ui/button";

export default function HeaderAuth() {
	return (
		<div
			className="flex gap-4"
			onClick={async () => {
				await authClient.signIn.social({
					provider: "google",
				});
			}}
		>
			<Button variant="ghost">Sign In</Button>
			<Button>Get Started</Button>
		</div>
	);
}
