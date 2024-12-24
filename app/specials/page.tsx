import type { Metadata } from 'next'

// components
import Hero from '@/components/Hero'
import DoubleSection from '@/components/DoubleSection'

// queries
import { getPageById, getSectionById } from '@/graphql/queries'

// metadata
export const metadata: Metadata = {
	title: 'Wellform MD - Specials'
}

export default async function Specials() {
	const page = await getPageById('cG9zdDoxNTM4')
	const sections = []

	// Getting the sections
	if (page.pageFields.sections && page.pageFields.sections.edges) {
		for (const edge of page.pageFields.sections.edges) {
			const section = await getSectionById(edge.node.id)
			sections.push(section)
		}
	}

	const heroSection = sections[0]?.sectionFields
	const subscribeSection = sections[1]?.sectionFields
	const locationSection = sections[2]?.sectionFields

	return (
		<main>
			<Hero
				subtitle={heroSection?.subtitle || ''}
				title={heroSection?.title || ''}
			/>

			{/* subscribe section */}
			<DoubleSection
				title={subscribeSection.title}
				subtitle={subscribeSection.subtitle}
				text={subscribeSection.text}
				image={subscribeSection.image.node.link}
				green
				subscribe
			/>

			{/* location section */}
			<DoubleSection
				title={locationSection.title}
				subtitle={locationSection.subtitle}
				text={locationSection.text}
				image={locationSection.image.node.link}
				button1={{ text: 'Book Consultation', link: '/' }}
				button2={{
					text: 'Get Directions',
					link: 'https://maps.app.goo.gl/Qjy9GdbbLW6b3qVq9'
				}}
			/>
		</main>
	)
}
