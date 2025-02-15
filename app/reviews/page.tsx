import type { Metadata } from 'next'

// components
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import DoubleSection from '@/components/DoubleSection'

// queries
import {
	getPageById,
	getSectionById,
	getTestimonials,
	getPageAndSections
} from '@/graphql/queries'

// metadata
export const metadata: Metadata = {
	title: 'Wellform MD - Reviews'
}

export default async function Reviews() {
	const data = await getPageAndSections('cG9zdDoxNTc3')

	const { props } = data

	const sections = props.sections

	// Sections
	const heroSection = sections[1]?.node.sectionFields
	const locationSection = sections[0]?.node.sectionFields

	// Testimonials
	const testimonials = await getTestimonials()

	return (
		<main>
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
				title={locationSection?.title}
				subtitle={locationSection?.subtitle}
				text={locationSection?.text}
				image={locationSection?.image.node.link}
				button1={{ text: 'Book Consultation', link: '/' }}
				button2={{
					text: 'Get Directions',
					link: 'https://maps.app.goo.gl/znSkAUfL7sD66SKp9'
				}}
			/>
		</main>
	)
}
