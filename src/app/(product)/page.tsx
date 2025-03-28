import Rise from "@/components/animation/rise";
import { BackgroundLines } from "@/components/BackgroundLines";
import { useAuthState } from "@/hooks/useAuthState";
import CTA from "./_components/cta";

export default async function HomePage() {
	const { signedIn } = await useAuthState();

	return (
		<main className="relative flex flex-col items-center gap-4 px-16">
			<BackgroundLines className="pointer-events-none flex w-full -translate-y-36 flex-col items-center justify-center gap-6 bg-transparent">
				<Rise>
					<h1 className="z-50 text-center text-6xl font-semibold">
						A new way to learn.
					</h1>
				</Rise>
				<Rise delay={0.1}>
					<p className="text-foreground/60 z-50 text-center text-2xl">
						No need for textbooks. Get personalized videos in
						minutes.
					</p>
				</Rise>
				<Rise delay={0.2}>
					<div className="pointer-events-auto !z-50 grid w-[300px] grid-cols-2 gap-4">
						<CTA signedIn={signedIn} />
					</div>
				</Rise>
			</BackgroundLines>
		</main>
	);
}
