import dayjs from "dayjs";

interface RestaurantCardProps {
	publicId: string;
	name: string;
	line1: string;
	line2: string | null;
	city: string;
	postCode: string;
	country: string;
	bannerUrl: string;
	style: string;
	serviceSlots: {
		date: string;
	}[];
}

function RestaurantCard({ ...props }: RestaurantCardProps) {
	const now = dayjs();
	const nextSlot = props.serviceSlots
		.filter((s) => dayjs(Number(s.date)).isAfter(now))
		.toSorted(
			(a, b) =>
				dayjs(Number(a.date)).valueOf() - dayjs(Number(b.date)).valueOf(),
		)
		.at(0);

	const nextSlotDate = nextSlot ? dayjs(Number(nextSlot.date)) : null;

	return (
		<article
			key={props.publicId}
			className="flex flex-col items-start justify-between"
		>
			<div className="relative w-full">
				<img
					alt={props.name}
					src={props.bannerUrl}
					className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2 dark:bg-gray-800"
				/>
				<div className="absolute inset-0 rounded-2xl inset-ring inset-ring-gray-900/10 dark:inset-ring-white/10" />
			</div>
			<div className="flex max-w-xl flex-col justify-between w-full">
				<div className="mt-5 flex items-center justify-center gap-x-4 text-xs">
					{nextSlotDate ? (
						<time
							dateTime={nextSlotDate.toISOString()}
							className="text-gray-500 dark:text-gray-400"
						>
							Avail : {nextSlotDate.format("DD MMM YYYY")}
						</time>
					) : (
						<span className="text-gray-500 dark:text-gray-400">
							No upcoming service
						</span>
					)}
					<span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 dark:bg-gray-800/60 dark:text-gray-300 dark:hover:bg-gray-800">
						{props.style}
					</span>
				</div>
				<div className="group relative grow">
					<h3 className="mt-5 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300">
						<a href={props.bannerUrl}>
							<span className="absolute inset-0" />
							{props.name}
						</a>
					</h3>
					<p className="mt-5 text-sm/6 text-gray-600 dark:text-gray-400">
						{props.line1}
					</p>
					{props.line2 && (
						<p className="text-sm/6 text-gray-600 dark:text-gray-400">
							{props.line2}
						</p>
					)}
					<p className="text-sm/6 text-gray-600 dark:text-gray-400">
						{props.postCode}
					</p>
					<p className="text-sm/6 text-gray-600 dark:text-gray-400">
						{props.city}
					</p>
					<p className="ext-sm/6 text-gray-600 dark:text-gray-400">
						{props.country}
					</p>
				</div>
			</div>
		</article>
	);
}

export default RestaurantCard;
