import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthState } from "@/hooks/useAuthState";
import { createMetadata } from "@/lib/metadata";
import SettingsContent from "./_components/content";

export const metadata = createMetadata({
	title: "Settings - Kodisc Dashboard",
	allowIndexing: false,
});
export default async function DashboardSettingsPage({
	searchParams,
}: {
	searchParams: Promise<{ tab: string }>;
}) {
	const { user, signedIn } = await useAuthState();
	if (!signedIn) return;

	const defaultTab = (await searchParams).tab || "general";

	return (
		<div className="flex w-full flex-col gap-2">
			<h1 className="text-3xl font-semibold">Settings</h1>
			<p className="text-foreground/50 text-lg">
				Edit your account settings and details here.
			</p>

			<Tabs
				defaultValue={defaultTab}
				className="mt-4 w-full max-w-[600px]"
			>
				<TabsList className="grid w-full grid-cols-3 bg-transparent">
					<TabsTrigger
						value="general"
						className="[&[data-state=active]]:bg-stone-200/75"
					>
						General
					</TabsTrigger>
					<TabsTrigger
						value="security"
						className="[&[data-state=active]]:bg-stone-200/75"
					>
						Security
					</TabsTrigger>
					<TabsTrigger
						value="billing"
						className="[&[data-state=active]]:bg-stone-200/75"
					>
						Billing
					</TabsTrigger>
				</TabsList>
				<div className="border-foreground/10 my-2 w-full border-b-2" />
				<SettingsContent user={user} />
			</Tabs>
		</div>
	);
}
