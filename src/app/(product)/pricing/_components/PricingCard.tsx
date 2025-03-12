import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingCard({
	title,
	price,
	useCase,
	features,
	timeframe,
	action,
}: {
	title: React.ReactNode;
	price: string;
	useCase: string;
	features: string[];
	timeframe: string;
	action: string;
}) {
	return (
		<div className="border-foreground/10 flex h-full w-full flex-col justify-between gap-7 rounded-md border-[1px] bg-white p-6">
			<div className="flex flex-col gap-7">
				<h2 className="text-xl font-medium">{title}</h2>
				<div className="flex flex-col gap-2">
					<span className="text-3xl font-semibold">
						${price}
						<span className="text-foreground/60 text-base font-normal">
							/mo
						</span>
					</span>
					<span className="text-foreground/60 text-sm">
						billed {timeframe}
					</span>
				</div>
				<div className="flex flex-col gap-3">
					<span className="font-medium">{useCase}</span>
					{features.map((feature, i) => (
						<div className="flex items-center gap-2" key={i}>
							<Check className="h-4 w-4" />
							<span className="text-sm">{feature}</span>
						</div>
					))}
				</div>
			</div>
			<Link href="" className="w-full">
				<Button className="w-full">{action}</Button>
			</Link>
		</div>
	);
}
