import type { Metadata } from 'next'

// components
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import DoubleSection from '@/components/DoubleSection'
import Reviews from '@/components/Reviews'

// queries
import { getPageById, getSectionById, getReviews } from '@/graphql/queries'

// metadata
export const metadata: Metadata = {
	title: 'Wellform MD - Gallery'
}

export default async function Gallery() {
	const page = await getPageById('cG9zdDo1MjE=')
	const sections = []

	// Getting the sections
	if (page.pageFields.sections && page.pageFields.sections.edges) {
		for (const edge of page.pageFields.sections.edges) {
			const section = await getSectionById(edge.node.id)
			sections.push(section)
		}
	}

	// Sections
	const heroSection = sections[0]?.sectionFields
	const locationSection = sections[1]?.sectionFields

	// Reviews
	const reviews = await getReviews()

	return (
		<main>
			<Hero
				subtitle={heroSection?.subtitle || ''}
				title={heroSection?.title || ''}
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
