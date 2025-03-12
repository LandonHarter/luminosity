import { useAuthState } from "@/hooks/useAuthState";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import HeaderAvatar from "./avatar";

export default async function Header() {
	const { user, signedIn } = await useAuthState();

	return (
		<header className="grid h-24 w-screen grid-cols-2 items-center px-6 sm:px-10 lg:grid-cols-3 lg:px-16">
			<Link href="/">
				<Image
					priority
					src="/brand/logo-transparent.svg"
					alt="Luminosity Logo"
					width={256}
					height={256}
					className="aspect-[2563/1024] h-16 w-fit"
				/>
			</Link>
			<nav className="hidden justify-self-center lg:block">
				<ul className="flex items-center justify-center gap-24">
					<li className="text-base transition-transform duration-300 hover:scale-110">
						<Link href="/pricing">Pricing</Link>
					</li>
					<li className="text-base transition-transform duration-300 hover:scale-110">
						<Link href="/faq">FAQ</Link>
					</li>
					<li className="text-base transition-transform duration-300 hover:scale-110">
						<Link href="/contact">Contact</Link>
					</li>
				</ul>
			</nav>

			<div className="hidden items-center gap-4 justify-self-end lg:flex">
				{signedIn ? (
					<HeaderAvatar user={user} />
				) : (
					<>
						<Link href="/signin">
							<Button variant="ghost">Sign In</Button>
						</Link>
						<Button>Get Started</Button>
					</>
				)}
			</div>
		</header>
	);
}
