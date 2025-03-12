"use client";

import Form, { SubmitButton } from "@/components/form";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function BillingSettings() {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex flex-col gap-2">
			<div className="border-foreground/10 flex items-center justify-between rounded-md border-[1px] bg-white p-4">
				<div className="flex flex-col">
					<span className="text-lg font-medium">Free</span>
					<p className="text-foreground/60 text-sm">
						Check out your{" "}
						<Link href="/pricing" className="underline">
							benefits
						</Link>
					</p>
				</div>
				<Link href="/pricing">
					<Button>Change Plan</Button>
				</Link>
			</div>
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogTrigger asChild>
					<Button variant="destructive" className="mt-4 w-fit">
						Cancel Subscription
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Are you sure you want to cancel?
						</AlertDialogTitle>
						<AlertDialogDescription>
							Your plan will be cancelled immediately and you will
							lose access to all paid features.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<Form
							action={async () => {
								await new Promise((resolve) =>
									setTimeout(resolve, 1000)
								);
								setOpen(false);
								toast.success("Subscription cancelled");
							}}
						>
							{(ref, loading, setLoading) => (
								<SubmitButton
									className="!bg-destructive text-white transition-all duration-100 hover:brightness-95"
									loading={loading}
									setLoading={setLoading}
									formRef={ref}
								>
									Cancel
								</SubmitButton>
							)}
						</Form>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
