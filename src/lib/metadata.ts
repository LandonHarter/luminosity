import { Metadata } from "next";

export type MetadataProps = {
	title?: string;
	description?: string;
	banner?: string;
	path?: string;
	allowIndexing?: boolean;
};

const BaseTitle = "Luminosity - Explaining complex topics with simple videos";
const BaseDescription =
	"Luminosity is a platform that explains complex topics with simple videos, all generated by AI.";

const baseUrl =
	process.env.NEXT_PUBLIC_BASE_URL ||
	"https://luminosityai.azurewebsites.net";
export function createMetadata(props: MetadataProps = {}) {
	return {
		title: props.title ?? BaseTitle,
		metadataBase: new URL(baseUrl + (props.path ?? "/")),
		baseUrl,
		description: props.description ?? BaseDescription,
		authors: [
			{
				name: "Landon Harter",
				url: "https://landonharter.me",
			},
		],
		publisher: "Luminosity",
		robots: {
			index: props.allowIndexing ?? true,
			follow: props.allowIndexing ?? true,
		},
		creator: "Landon Harter",
		applicationName: "Luminosity",
		icons: [
			{
				url: baseUrl + "/brand/favicon.ico",
			},
		],
		openGraph: {
			title: props.title ?? BaseTitle,
			description: props.description ?? BaseDescription,
			url: baseUrl + (props.path ?? "/"),
			type: "website",
			siteName: "Luminosity",
			images: [
				{
					url: props.banner || baseUrl + "/brand/logo.png",
				},
			],
		},
		twitter: {
			cardType: "summary_large_image",
			site: baseUrl,
			title: props.title ?? BaseTitle,
			description: props.description ?? BaseDescription,
			images: [
				{
					url: props.banner || baseUrl + "/brand/logo.png",
				},
			],
		},
		alternates: {
			canonical: baseUrl + (props.path ?? "/"),
			languages: {
				"en-US": baseUrl + (props.path ?? "/"),
			},
		},
	} as Metadata;
}
