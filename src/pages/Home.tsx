import { useQuery } from "@apollo/client/react";
import { graphql } from "../gql";
import RestaurantCard from "../components/home/RestaurantCard";
import Header from "../components/common/Header";

const RESTAURANTS = graphql(`
	query Restaurants {
		restaurants {
			publicId
			name
			bannerUrl
			line1
			line2
			city
			postCode
			country
			style
			serviceSlots {
				date
			}
		}
	}
`);

export default function HomePage() {
	const { data, loading, error } = useQuery(RESTAURANTS);

	if (loading) return <></>;
	if (error) return <p>Something went wrong: {error.message}</p>;

	return (
		<>
			<Header />
			<div className="bg-white py-24 sm:py-32 dark:bg-gray-900">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">
							Our Restaurants
						</h2>
						<p className="mt-2 text-lg/8 text-gray-600 dark:text-gray-300">
							Learn how to grow your business with our expert advice.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
						{data?.restaurants.map((r) => (
							<RestaurantCard key={r.publicId} {...r} />
						))}
					</div>
				</div>
			</div>
		</>
	);
}
