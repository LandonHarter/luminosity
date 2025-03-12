import HeaderAvatar from "@/components/header/avatar";
import { useAuthState } from "@/hooks/useAuthState";
import HeaderPath from "./HeaderPath";

export default async function DashboardHeader() {
	const { user, signedIn } = await useAuthState();
	if (!signedIn) return <></>;

	return (
		<header className="flex w-full items-center justify-between px-6 py-4">
			<HeaderPath />
			<HeaderAvatar user={user} />
		</header>
	);
}
