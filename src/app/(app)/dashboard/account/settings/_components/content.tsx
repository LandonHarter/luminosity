"use client";

import { TabsContent } from "@/components/ui/tabs";
import { User } from "@prisma/client";
import { useState } from "react";
import BillingSettings from "./billing";
import GeneralSettings from "./general";
import SecuritySettings from "./security";

export default function SettingsContent({ user }: { user: User }) {
	const [statefulUser, setUser] = useState(user);

	return (
		<>
			<TabsContent value="general">
				<GeneralSettings user={statefulUser} setUser={setUser} />
			</TabsContent>
			<TabsContent value="security">
				<SecuritySettings />
			</TabsContent>
			<TabsContent value="billing">
				<BillingSettings />
			</TabsContent>
		</>
	);
}
