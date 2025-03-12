import Rise from "@/components/animation/rise";
import Question from "@/components/faq/question";
import { FAQuestions } from "@/components/faq/questions";
import PricingCards from "./_components/PricingCards";

export const metadata = {
	title: "Pricing - Luminosity",
	description:
		"Our pricing is designed to be affordable for everyone. No matter your budget, we have a plan for you.",
};
export default function PricingPage() {
	return (
		<main className="relative flex w-screen flex-col items-center gap-8 px-4 py-24">
			<Rise className="text-center text-4xl font-semibold sm:text-5xl lg:text-6xl">
				Unlock even more power
			</Rise>
			<Rise
				className="text-foreground/60 w-1/2 min-w-[400px] text-center text-lg sm:text-xl"
				delay={0.1}
			>
				Our pricing is competitive. Actually, it's just cheap.
			</Rise>
			<PricingCards />

			<Rise
				className="mt-32 text-center text-3xl font-semibold sm:text-4xl lg:text-5xl"
				delay={0.2}
			>
				Billing FAQ
			</Rise>
			<Rise
				className="text-foreground/60 w-1/2 min-w-[400px] text-center text-lg sm:text-xl"
				delay={0.3}
			>
				Have questions about billing? We've got answers.
			</Rise>
			{FAQuestions.map((question, i) => (
				<Rise
					key={i}
					delay={i * 0.1}
					className="flex w-full justify-center"
				>
					<Question
						question={question.question}
						answer={question.answer}
					/>
				</Rise>
			))}
		</main>
	);
}
