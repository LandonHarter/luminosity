import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, Library, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type SidebarItem = {
	title: string;
	url: string;
	icon: any;
};

type SidebarGroup = {
	title: string;
	items: SidebarItem[];
};

const groups = [
	{
		title: "Dashboard",
		items: [
			{
				title: "Home",
				url: "/dashboard",
				icon: Home,
			},
			{
				title: "Spaces",
				url: "/dashboard/spaces",
				icon: Library,
			},
		],
	},
	{
		title: "Account",
		items: [
			{
				title: "Settings",
				url: "/dashboard/account/settings",
				icon: Settings,
			},
		],
	},
];

export default async function DashboardSidebar() {
	return (
		<Sidebar id="sidebar">
			<SidebarHeader>
				<Link href="/dashboard">
					<Image
						src="/brand/logo-transparent.svg"
						alt="Kodisc Logo"
						width={256}
						height={256}
						className="aspect-[2563/1024] h-16 w-fit"
					/>
				</Link>
			</SidebarHeader>
			<SidebarContent>
				{groups.map((group) => (
					<SidebarGroup key={group.title} className="list-none">
						<SidebarGroupLabel>{group.title}</SidebarGroupLabel>
						{group.items.map((item) => (
							<SidebarMenuItem
								key={item.title}
								className="hover:bg-accent transition-colors duration-150"
								id={"sidebar-" + item.title.toLowerCase()}
							>
								<SidebarMenuButton asChild>
									<Link href={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarGroup>
				))}
			</SidebarContent>
		</Sidebar>
	);
}
