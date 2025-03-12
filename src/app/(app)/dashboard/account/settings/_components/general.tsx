"use client";

import Form, { SubmitButton } from "@/components/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpcClient } from "@/trpc/client";
import { User } from "@prisma/client";
import { toast } from "sonner";

export default function GeneralSettings({
	user,
	setUser,
}: {
	user: User;
	setUser: (user: User) => void;
}) {
	return (
		<div className="flex flex-col gap-8 py-4">
			<div className="flex items-center gap-4">
				<Label htmlFor="upload-avatar">
					<Avatar className="h-20 w-20 cursor-pointer">
						<AvatarImage src={user.image!} alt={user.name!} />
						<AvatarFallback className="bg-stone-200/50 text-2xl">
							{user.name?.substring(0, 1).toUpperCase()}
						</AvatarFallback>
						<Input
							type="file"
							className="hidden"
							id="upload-avatar"
							accept="image/*"
							onChange={() => {
								toast.error("I didn't do this part, sorry!");
							}}
						/>
					</Avatar>
				</Label>
				<div className="flex flex-col">
					<h1 className="text-lg font-medium">Profile Picture</h1>
					<p className="text-foreground/50">
						People will see this picture when they visit your
						profile.
					</p>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<Label htmlFor="name">Name</Label>
				<Input
					id="name"
					value={user.name!}
					onChange={(e) => setUser({ ...user, name: e.target.value })}
					autoCapitalize="off"
					autoCorrect="off"
					autoComplete="off"
					autoSave="off"
					spellCheck={false}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					value={user.email!}
					disabled
					className="disabled:opacity-50"
				/>
			</div>

			<Form
				action={async () => {
					await trpcClient.user.updateUser.mutate({
						name: user.name,
					});
					toast.success("Settings updated!");
				}}
				className="-mt-4"
			>
				{(ref, loading, setLoading) => (
					<SubmitButton
						className="!w-fit"
						loading={loading}
						setLoading={setLoading}
						formRef={ref}
					>
						Save
					</SubmitButton>
				)}
			</Form>
		</div>
	);
}
