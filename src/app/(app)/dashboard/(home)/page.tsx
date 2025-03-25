import GenerateVideo from "./_components/generate";

export const maxDuration = 1800;
export default function DashboardHome() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<GenerateVideo />
		</div>
	);
}
