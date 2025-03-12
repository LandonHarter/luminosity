import Rise from "@/components/animation/rise";
import Question from "@/components/faq/question";
import { FAQuestions } from "@/components/faq/questions";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
	title: "FAQ - Luminosity",
	description:
		"Have questions? We have answers. Check out some of Kodisc's frequently asked questions.",
});
export default function FAQPage() {
	return (
		<main className="relative flex w-screen flex-col items-center gap-8 px-4 py-24">
			<Rise className="text-center text-4xl font-semibold sm:text-5xl lg:text-6xl">
				You must have questions...
			</Rise>
			<Rise
				className="text-foreground/60 w-1/2 min-w-[400px] text-center text-lg sm:text-xl"
				delay={0.1}
			>
				Hi Digital Jams! My name is Landon. Maybe that answers one of
				your questions, idk.
			</Rise>
			{FAQuestions.map((question, i) => (
				<Question
					question={question.question}
					answer={question.answer}
					key={i}
				/>
			))}
		</main>
	);
}
