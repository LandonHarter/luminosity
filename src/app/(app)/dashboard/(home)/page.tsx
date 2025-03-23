import GenerateVideo from "./_components/generate";

export default function DashboardHome() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<div className="flex w-full max-w-[800px] flex-col items-center justify-center gap-8">
				<h1 className="text-center text-4xl font-medium">
					What do you want to know?
				</h1>
				<GenerateVideo />
			</div>
		</div>
	);
}
