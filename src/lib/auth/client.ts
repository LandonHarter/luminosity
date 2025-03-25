"use client";

import { createAuthClient } from "better-auth/react";

const baseURL =
	process.env.NEXT_PUBLIC_BASE_URL ||
	"https://luminosityai.azurewebsites.net";
export const authClient = createAuthClient({
	baseURL,
});
