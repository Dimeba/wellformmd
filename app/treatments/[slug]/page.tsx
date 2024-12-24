import { Metadata } from 'next'
import {
	getTreatments,
	getSectionById,
	getTestimonials
} from '@/graphql/queries'
import { notFound } from 'next/navigation'

// components
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import IndividalPageContent from '@/components/IndividalPageContent'
import DoubleSection from '@/components/DoubleSection'

function createSlug(title: string) {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9 ]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
}

export async function generateStaticParams() {
	const treatments = await getTreatments()

	return treatments.map(({ node }) => ({
		slug: createSlug(node.title)
	}))
}

// metadata
export async function generateMetadata({
	params
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const treatments = await getTreatments()
	const slug = (await params).slug
	const treatment = treatments.find(
		({ node }: { node: { title: string } }) => createSlug(node.title) === slug
	)

	if (!treatment) {
		return {
			title: 'Treatment Not Found'
		}
	}

	return {
		title: treatment.node.title
	}
}

export default async function TreatmentsSlugPage({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const slug = (await params).slug

	const treatments = await getTreatments()

	const treatment = treatments.find(
		({ node }) => createSlug(node.title) === slug
	)
	const subscribeSection = await getSectionById('cG9zdDoyMTg4')
	const testimonialsSection = await getSectionById('cG9zdDoyMTU0')

	const testimonials = await getTestimonials()

	if (!treatment) {
		notFound()
	}

	return (
		<main>
			{/* Hero */}
			<Hero
				title={treatment.node.title}
				image={treatment.node.treatmentFields.image.node.link}
				hideText
			/>

			{/* Content */}
			<IndividalPageContent
				title={treatment.node.title}
				subtitle={treatment.node.treatmentFields.subtitle}
				text={treatment.node.treatmentFields.text}
			/>

			{/* Treatments */}
			<Section
				title='Our Treatments'
				subtitle='Top-rated services'
				cardsContent={treatments}
				cardsColumns={4}
				slider
			/>

			{/* subscribe section */}
			<DoubleSection
				title={subscribeSection?.sectionFields.title}
				subtitle={subscribeSection?.sectionFields.subtitle}
				text={subscribeSection?.sectionFields.text}
				image={subscribeSection?.sectionFields.image.node.link}
				green
				subscribe
			/>

			{/* testimonials */}
			<Section
				title={testimonialsSection?.sectionFields.title}
				subtitle={testimonialsSection?.sectionFields.subtitle}
				cardsContent={testimonials}
				cardsColumns={4}
				slider
			/>
		</main>
	)
}
