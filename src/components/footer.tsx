import { Instagram, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="border-foreground/10 flex w-full flex-col items-center border-t-2 px-8 py-12">
			<div className="flex w-full max-w-[1200px] flex-col gap-6">
				<div className="flex w-full items-center justify-between gap-6 max-sm:flex-col">
					<Link href="/">
						<Image
							src="/brand/logo-transparent.svg"
							alt="Luminosity Logo"
							width={256}
							height={256}
							className="aspect-[2563/1024] h-[72px] w-fit"
						/>
					</Link>
					<div className="flex items-center gap-8">
						<Link href="/pricing" className="text-foreground/80">
							Pricing
						</Link>
						<Link href="/contact" className="text-foreground/80">
							Contact
						</Link>
						<Link href="/terms" className="text-foreground/80">
							Terms
						</Link>
						<Link href="/privacy" className="text-foreground/80">
							Privacy
						</Link>
					</div>
				</div>
				<div className="border-foreground/10 w-full border-t-2" />
				<div className="flex w-full items-center justify-between gap-6 max-sm:flex-col">
					<p className="text-foreground/60">
						© {new Date().getFullYear()} Luminosity. All rights
						reserved.
					</p>
					<div className="flex items-center gap-6">
						<Link
							href="https://discord.gg/94GY44qsBg"
							target="_blank"
						>
							<svg
								width="800px"
								height="800px"
								viewBox="0 0 192 192"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								className="stroke-foreground/60 h-7 w-7"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="14"
									d="m68 138-8 16c-10.19-4.246-20.742-8.492-31.96-15.8-3.912-2.549-6.284-6.88-6.378-11.548-.488-23.964 5.134-48.056 19.369-73.528 1.863-3.334 4.967-5.778 8.567-7.056C58.186 43.02 64.016 40.664 74 39l6 11s6-2 16-2 16 2 16 2l6-11c9.984 1.664 15.814 4.02 24.402 7.068 3.6 1.278 6.704 3.722 8.567 7.056 14.235 25.472 19.857 49.564 19.37 73.528-.095 4.668-2.467 8.999-6.379 11.548-11.218 7.308-21.769 11.554-31.96 15.8l-8-16m-68-8s20 10 40 10 40-10 40-10"
								/>
								<ellipse
									cx="71"
									cy="101"
									className="fill-foreground/60"
									rx="13"
									ry="15"
								/>
								<ellipse
									cx="121"
									cy="101"
									className="fill-foreground/60"
									rx="13"
									ry="15"
								/>
							</svg>
						</Link>
						<Link href="https://x.com/Luminosityai" target="_blank">
							<Twitter className="stroke-foreground/60" />
						</Link>
						<Link
							href="https://www.youtube.com/channel/UCxBKjAknpEflf1Quq3waFgA"
							target="_blank"
						>
							<Youtube className="stroke-foreground/60" />
						</Link>
						<Link
							href="https://www.instagram.com/Luminosityai/"
							target="_blank"
						>
							<Instagram className="stroke-foreground/60" />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
