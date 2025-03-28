"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CTA({ signedIn }: { signedIn: boolean }) {
	const router = useRouter();

	return (
		<>
			<Button
				className="w-full !py-6 text-base"
				onClick={async () => {
					if (signedIn) {
						router.push("/dashboard");
					} else {
						await authClient.signIn.social({
							provider: "google",
						});
					}
				}}
			>
				{signedIn ? "Open App" : "Get Started"}
			</Button>
			<Link href="/faq">
				<Button variant="outline" className="w-full !py-6 text-base">
					Learn More
				</Button>
			</Link>
		</>
	);
}
