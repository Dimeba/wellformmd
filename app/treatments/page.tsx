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
	getTreatments,
	getReviews,
	getTestimonials,
	getPageAndSections
} from '@/graphql/queries'

// metadata
export const metadata: Metadata = {
	title: 'Wellform MD - Treatements'
}

export default async function Treatments() {
	const data = await getPageAndSections('cG9zdDoyMTE0')

	const { props } = data

	const sections = props.sections

	// Sections
	const heroSection = sections[0]?.node.sectionFields
	const testimonialsSection = sections[2]?.node.sectionFields
	const bannerSection = sections[3]?.node.sectionFields
	const locationSection = sections[1]?.node.sectionFields

	// Treatments
	const treatments = await getTreatments()

	// Reviews
	const reviews = await getReviews()

	// Testimonials
	const testimonials = await getTestimonials()

	return (
		<main>
			<Hero
				subtitle={heroSection?.subtitle || ''}
				title={heroSection?.title || ''}
				image={heroSection?.image?.node?.link || ''}
				leftAlign
			/>

			{/* treatments section */}
			<Section
				title='Treatments'
				cardsContent={treatments}
				cardsColumns={4}
				hideTitle
			/>

			{/* reviews */}
			<Reviews content={reviews} />

			{/* testimonials */}
			<Section
				title={testimonialsSection?.title}
				subtitle={testimonialsSection?.subtitle}
				cardsContent={testimonials}
				cardsColumns={4}
				slider
			/>

			{/* Banner Section */}
			<DoubleSection
				title={bannerSection?.title}
				text={bannerSection?.text}
				button1={{ text: 'Request FREE Consultation', link: '/' }}
				image={bannerSection?.image.node.link}
				banner
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
