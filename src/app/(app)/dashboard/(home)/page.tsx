import { useAuthState } from "@/hooks/useAuthState";
import { redirect } from "next/navigation";
import GenerateVideo from "./_components/generate";

export const maxDuration = 1800;
export default async function DashboardHome() {
	const { user, signedIn } = await useAuthState();
	if (!signedIn) redirect("/");

	let isGenerating = false;
	let generatingAt: Date | null = null;
	let generatingPrompt: string | null = null;
	let space: string | null = null;

	if (user && user.generating) {
		isGenerating = true;
		generatingAt = user.generatingAt;
		generatingPrompt = user.prompt;
		space = user.generatingSpace;
	}

	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<GenerateVideo
				isGenerating={isGenerating}
				generatingAt={generatingAt}
				generatingPrompt={generatingPrompt}
				space={space}
			/>
		</div>
	);
}
