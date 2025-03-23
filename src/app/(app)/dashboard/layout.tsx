import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuthState } from "@/hooks/useAuthState";
import Image from "next/image";
import { redirect } from "next/navigation";
import DashboardHeader from "./_components/header";
import DashboardSidebar from "./_components/sidebar";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user, signedIn } = await useAuthState();
	if (!signedIn) redirect("/");

	return (
		<div className="relative">
			<SidebarProvider className="absolute max-md:hidden">
				<DashboardSidebar />
				<div className="flex w-full flex-col">
					<DashboardHeader />
					<main
						className="w-full px-6 py-2 pt-4"
						style={{
							minHeight: "calc(100vh - 68px)",
						}}
					>
						{children}
					</main>
				</div>
			</SidebarProvider>
			<div className="absolute flex h-screen w-screen flex-col items-center justify-center gap-2 px-8 md:hidden">
				<Image
					src="/brand/logo-transparent.svg"
					alt="Luminosity Logo"
					width={256}
					height={256}
					className="aspect-[2563/1024] h-24 w-fit"
				/>
				<p className="text-foreground/50 text-center text-xl">
					Please use a larger screen to view this page.
				</p>
			</div>
		</div>
	);
}
