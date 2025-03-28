import Footer from "@/components/footer";
import Header from "@/components/header/header";

export default function ProductLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="flex flex-col overflow-x-hidden">
			<Header />
			{children}
			<Footer />
		</main>
	);
}
