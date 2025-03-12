type Question = {
	question: string;
	answer: React.ReactNode;
};

export const FAQuestions: Question[] = [
	{
		question: "Yo what's up Digital Jam judges?",
		answer: (
			<>
				If you found this, I applaud your curiosity. That is true
				dedication.
			</>
		),
	},
	{
		question: "A win would be nice, right?",
		answer: (
			<>
				If you are looking this deep into my project, I would say I'm on
				the right track.
			</>
		),
	},
	{
		question: "Lowkey, just here for the vibes.",
		answer: (
			<>
				I just really like coding. Even if I don't win, I'm still proud
				of what I've done.
			</>
		),
	},
];
