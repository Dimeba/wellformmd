import type { Metadata } from 'next'

// components
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import DoubleSection from '@/components/DoubleSection'

// queries
import { getPageById, getSectionById, getTestimonials } from '@/graphql/queries'

// metadata
export const metadata: Metadata = {
	title: 'Wellform MD - Reviews'
}

export default async function Reviews() {
	const page = await getPageById('cG9zdDoyMTYz')
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
	const locationSection = sections[1].sectionFields

	// Testimonials
	const testimonials = await getTestimonials()

	return (
		<div>
			<Hero
				subtitle={heroSection?.subtitle || ''}
				title={heroSection?.title || ''}
				image={heroSection?.image?.node?.link || ''}
			/>

			{/* testimonials */}
			<Section
				title='Testimonials'
				cardsContent={testimonials}
				cardsColumns={4}
				bottomButtons
				hideTitle
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
		</div>
	)
}