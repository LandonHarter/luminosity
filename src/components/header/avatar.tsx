"use client";

import { authClient } from "@/lib/auth/client";
import { User } from "@prisma/client";
import { Home, Library, LogOut, Settings } from "lucide-react";
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
				<Link href="/dashboard" className="mt-2">
					<DropdownMenuItem className="cursor-pointer">
						<Home className="mr-2 h-4 w-4" />
						Dashboard
					</DropdownMenuItem>
				</Link>
				<Link href="/dashboard/spaces" className="mt-2">
					<DropdownMenuItem className="cursor-pointer">
						<Library className="mr-2 h-4 w-4" />
						Spaces
					</DropdownMenuItem>
				</Link>
				<Link href="">
					<DropdownMenuItem className="cursor-pointer">
						<Settings className="mr-2 h-4 w-4" />
						Settings
					</DropdownMenuItem>
				</Link>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="!text-destructive cursor-pointer"
					onClick={async () => {
						await authClient.signOut();
						router.refresh();
					}}
				>
					<LogOut className="stroke-destructive mr-2 h-4 w-4" />
					Sign Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
