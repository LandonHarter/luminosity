"use client";

import { authClient } from "@/lib/auth/client";
import { User } from "@prisma/client";
import { Library, LogOut, Settings, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function HeaderAvatar({ user }: { user: User }) {
	const router = useRouter();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="outline-none">
				<Avatar className="h-9 w-9 cursor-pointer">
					<AvatarImage src={user.image!} alt={user.name!} />
					<AvatarFallback>
						{user.name?.substring(0, 1).toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mt-2 w-56 p-2" align="end">
				<Link href="/dashboard/projects" className="mt-2">
					<DropdownMenuItem className="cursor-pointer">
						<Library className="mr-2 h-4 w-4" />
						Projects
					</DropdownMenuItem>
				</Link>
				<Link href="/dashboard/account/profile">
					<DropdownMenuItem className="cursor-pointer">
						<UserIcon className="mr-2 h-4 w-4" />
						Profile
					</DropdownMenuItem>
				</Link>
				<Link href="/dashboard/account/settings">
					<DropdownMenuItem className="cursor-pointer">
						<Settings className="mr-2 h-4 w-4" />
						Settings
					</DropdownMenuItem>
				</Link>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="text-destructive cursor-pointer"
					onClick={async () => {
						authClient.signOut();
						router.refresh();
					}}
				>
					<LogOut className="mr-2 h-4 w-4" />
					Sign Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
