import type { Metadata } from 'next'

// components
import Hero from '@/components/Hero'
import Reviews from '@/components/Reviews'
import Section from '@/components/Section'
import DoubleSection from '@/components/DoubleSection'

// queries
import {
	getPageById,
	getSectionById,
	getTreatments,
	getBenefits,
	getReviews,
	getArticles,
	getTestimonials
} from '@/graphql/queries'

// metadata
export const metadata: Metadata = {
	title: 'Wellform MD - Weight Loss & Wellness'
}

export default async function Home() {
	// Getting the page
	const page = await getPageById('cG9zdDo2ODU=')
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
	const treatmentsSection = sections[1]?.sectionFields
	const benefitsSection = sections[2]?.sectionFields
	const doubleSection1 = sections[3]?.sectionFields
	const doubleSection2 = sections[4]?.sectionFields
	const subscribeSection = sections[5]?.sectionFields
	const testimonialsSection = sections[6]?.sectionFields
	const locationSection = sections[7]?.sectionFields

	// Treatments
	const treatments = await getTreatments()

	// Benefits
	const benefits = await getBenefits()

	// Reviews
	const reviews = await getReviews()

	// Articles
	const articles = await getArticles()

	// Testimonials
	const testimonials = await getTestimonials()

	return (
		<main>
			<Hero
				title={heroSection.title}
				subtitle={heroSection.subtitle}
				text={heroSection.text}
				image={heroSection.image.node.link}
				fullHeight
				isHomepage
			/>

			{/* treatments section */}
			<Section
				title={treatmentsSection.title}
				subtitle={treatmentsSection.subtitle}
				text={treatmentsSection.text}
				cardsContent={treatments}
				cardsColumns={4}
			/>

			{/* benefits section */}
			<Section
				title={benefitsSection.title}
				subtitle={benefitsSection.subtitle}
				cardsContent={benefits}
				cardsColumns={4}
				cardsFlex
				bottomButtons
			/>

			{/* reviews */}
			<Reviews content={reviews} />

			{/* double section 1 */}
			<DoubleSection
				title={doubleSection1.title}
				subtitle={doubleSection1.subtitle}
				text={doubleSection1.text}
				smallText={doubleSection1.smallText}
				image={doubleSection1.image.node.link}
				image2={doubleSection1.image2.node.link}
				button1={{ text: 'Learn More', link: '/treatments' }}
				button2={{ text: 'Before & After Photos', link: '/gallery' }}
			/>

			{/* double section 2 */}
			<DoubleSection
				title={doubleSection2.title}
				subtitle={doubleSection2.subtitle}
				text={doubleSection2.text}
				smallText={doubleSection2.smallText}
				image={doubleSection2.image.node.link}
				image2={doubleSection2.image2.node.link}
				reverse
				button1={{ text: 'Book Consultation', link: '/' }}
				button2={{ text: 'Our Treatments', link: '/treatments' }}
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

			{/* testimonials */}
			<Section
				title={testimonialsSection.title}
				subtitle={testimonialsSection.subtitle}
				cardsContent={testimonials}
				cardsColumns={4}
				slider
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

			{/* Latest Posts */}
			<Section
				title='Latest Posts'
				subtitle='Our Blog'
				cardsContent={articles}
				cardsColumns={3}
				slider
			/>
		</main>
	)
}
