"use client";

import Rise from "@/components/animation/rise";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import PricingCard from "./PricingCard";

export default function PricingCards() {
	const [timeframe, setTimeframe] = useState<"monthly" | "yearly">("yearly");

	return (
		<>
			<Rise delay={0.2}>
				<Tabs
					className="flex flex-col items-center"
					value={timeframe}
					onValueChange={(value) => setTimeframe(value as any)}
				>
					<TabsList>
						<TabsTrigger value="monthly">Monthly</TabsTrigger>
						<TabsTrigger value="yearly">Yearly</TabsTrigger>
					</TabsList>
				</Tabs>
			</Rise>
			<Rise
				delay={0.3}
				className="flex w-full max-w-[1150px] flex-col gap-8 md:grid md:grid-cols-3"
			>
				<PricingCard
					title="Free"
					price="0"
					useCase="Great to test out Luminosity"
					features={[
						"Basic Luminosity AI",
						"3 spaces/month",
						"10 flashcards/space",
						"No credit card required",
					]}
					timeframe={timeframe}
					action="Get started"
				/>
				<PricingCard
					title={
						<div className="flex items-center gap-2">
							Pro
							<Badge color="primary">Popular</Badge>
						</div>
					}
					price={timeframe === "monthly" ? "20" : "12"}
					useCase="Great for serious students"
					features={[
						"Unlimited spaces",
						"Advanced Luminosity AI",
						"Unlimited flashcards/space",
						"Priority support",
					]}
					timeframe={timeframe}
					action="Purchase"
				/>
				<PricingCard
					title="Basic"
					price={timeframe === "monthly" ? "12" : "8"}
					useCase="Great for avid studiers"
					features={[
						"Unlimited spaces",
						"Basic Luminosity AI",
						"Unlimited flashcards/space",
						"Standard support",
					]}
					timeframe={timeframe}
					action="Purchase"
				/>
			</Rise>
		</>
	);
}
