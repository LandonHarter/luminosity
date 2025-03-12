import FAQQuestion from "@/components/faq/question";
import { FAQuestions } from "@/components/faq/questions";
import Rise from "@/components/rise";
import { Hand, Handshake, Keyboard, SquarePlay } from "lucide-react";
import ContactCard from "./_components/ContactCard";

export const metadata = {
	title: "Contact - Luminosity",
	description:
		"I don't know why you would contact us, but here's how you can.",
};
export default function ContactPage() {
	return (
		<main className="relative flex w-screen flex-col items-center gap-8 px-4 py-24">
			<Rise className="text-center text-4xl font-semibold sm:text-5xl lg:text-6xl">
				We absolutely love <br />
				your feedback
			</Rise>
			<Rise
				className="text-foreground/60 w-1/3 min-w-[400px] text-center text-lg sm:text-xl"
				delay={0.1}
			>
				We are always looking to improve. So if you have any feedback or
				just want to say hi, we are here.
			</Rise>
			<div className="mt-16 flex w-full max-w-[1450px] flex-col items-center gap-6 sm:grid-cols-2 md:grid lg:grid-cols-4">
				<ContactCard
					title="Say hello!"
					description="Speak to our friendly team."
					email="hello@luminosity.ai"
					icon={<Hand />}
					delay={0.2}
				/>
				<ContactCard
					title="Chat to the devs"
					description="Got a bug? Let us know."
					email="dev@luminosity.ai"
					icon={<Keyboard />}
					delay={0.4}
				/>
				<ContactCard
					title="Social media?"
					description="Reach out to us about our content!"
					email="social@luminosity.ai"
					icon={<SquarePlay />}
					delay={0.6}
				/>
				<ContactCard
					title="Talk with the Founder"
					description="Got a big idea? Let's chat."
					email="landon@luminosity.ai"
					icon={<Handshake />}
					delay={0.8}
				/>
			</div>

			<Rise
				className="mt-32 text-center text-3xl font-semibold sm:text-4xl lg:text-5xl"
				delay={0.2}
			>
				Contact FAQ
			</Rise>
			<Rise
				className="text-foreground/60 w-1/2 min-w-[400px] text-center text-lg sm:text-xl"
				delay={0.3}
			>
				Have questions about contacting us? We've got answers.
			</Rise>
			{FAQuestions.map((question, i) => (
				<Rise
					key={i}
					delay={i * 0.1}
					className="flex w-full justify-center"
				>
					<FAQQuestion
						question={question.question}
						answer={question.answer}
					/>
				</Rise>
			))}
		</main>
	);
}
