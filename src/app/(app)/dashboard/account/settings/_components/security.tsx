"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SecuritySettings() {
	return (
		<div className="flex flex-col gap-8 py-4">
			<div className="flex flex-col gap-2">
				<h1 className="text-base font-medium">Change Password</h1>
				<p className="text-foreground/50 text-sm">
					It is recommended to change your password regularly.
				</p>
				<div
					onClick={() => {
						toast.error("I didn't actually do this lol");
					}}
				>
					<Button variant="outline">Change Password</Button>
				</div>
			</div>
		</div>
	);
}
