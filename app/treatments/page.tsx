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
	getTestimonials
} from '@/graphql/queries'

// metadata
export const metadata: Metadata = {
	title: 'Wellform MD - Treatements'
}

export default async function Treatments() {
	const page = await getPageById('cG9zdDoyMTE0')

	const edges = page?.pageFields?.sections?.edges ?? []
	const sectionIds = edges.map(edge => edge.node.id)

	// Fetch all sections in parallel
	const sections = await Promise.all(sectionIds.map(id => getSectionById(id)))

	// Sections
	const heroSection = sections[0]?.sectionFields
	const testimonialsSection = sections[1]?.sectionFields
	const bannerSection = sections[2]?.sectionFields
	const locationSection = sections[3]?.sectionFields

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
					link: 'https://maps.app.goo.gl/Qjy9GdbbLW6b3qVq9'
				}}
			/>
		</main>
	)
}
