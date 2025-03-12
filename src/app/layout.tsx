import { createMetadata } from "@/lib/metadata";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const font = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const metadata = createMetadata();
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${font.className} antialiased`}>
				<Toaster richColors />
				{children}
			</body>
		</html>
	);
}
