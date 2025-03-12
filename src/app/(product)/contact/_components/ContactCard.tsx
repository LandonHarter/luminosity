import Rise from "@/components/animation/rise";
import Link from "next/link";

export default function ContactCard({
	title,
	description,
	email,
	icon,
	delay,
}: {
	title: string;
	description: string;
	email: string;
	icon: React.ReactNode;
	delay?: number;
}) {
	return (
		<Rise
			className="border-foreground/10 flex h-full w-full flex-col justify-between gap-8 rounded-md border-[1px] bg-white p-6"
			delay={delay}
		>
			{icon}
			<div className="flex flex-col gap-2">
				<h3 className="text-foreground text-xl font-medium">{title}</h3>
				<p className="text-foreground/60">{description}</p>
				<Link
					href={`mailto:${email}`}
					target="_blank"
					className="mt-2 underline"
				>
					{email}
				</Link>
			</div>
		</Rise>
	);
}
