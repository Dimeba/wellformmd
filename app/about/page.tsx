import type { Metadata } from 'next'

// components
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import DoubleSection from '@/components/DoubleSection'
import Reviews from '@/components/Reviews'

// queries
import {
	getPageById,
	getSectionById,
	getReviews,
	getTeamMembers
} from '@/graphql/queries'

// metadata
export const metadata: Metadata = {
	title: 'Wellform MD - About Us'
}

export default async function About() {
	const page = await getPageById('cG9zdDo1MjA=')

	const edges = page?.pageFields?.sections?.edges ?? []
	const sectionIds = edges.map(edge => edge.node.id)

	// Fetch all sections in parallel
	const sections = await Promise.all(sectionIds.map(id => getSectionById(id)))

	// Sections
	const heroSection = sections[0]?.sectionFields
	const locationSection = sections[1]?.sectionFields

	// Reviews
	const reviews = await getReviews()
	const teamMembers = await getTeamMembers()

	return (
		<main>
			<Hero
				subtitle={heroSection?.subtitle || ''}
				title={heroSection?.title || ''}
			/>

			<Section
				title='Meet our Physicians'
				subtitle='OurTeam'
				cardsColumns={2}
				cardsContent={teamMembers}
				bottomButtons
			/>

			{/* reviews */}
			<Reviews content={reviews} />

			{/* location section */}
			<DoubleSection
				title={locationSection?.title}
				subtitle={locationSection?.subtitle}
				text={locationSection?.text}
				image={locationSection?.image.node.link}
				button1={{ text: 'Book Consultation', link: '/' }}
				button2={{
					text: 'Get Directions',
					link: 'https://maps.app.goo.gl/Qjy9GdbbLW6b3qVq9'
				}}
			/>
		</main>
	)
}
