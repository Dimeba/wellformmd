// components
import Hero from '@/components/Hero'
import Reviews from '@/components/Reviews'
import Section from '@/components/Section'

// queries
import {
	getPageById,
	getSectionById,
	getTreatments,
	getBenefits,
	getReviews
} from '@/graphql/queries'

export const metadata = {
	title: 'Wellform MD - Weight Loss & Wellness',
	description: 'Weight Loss & Wellness',
	icons: {
		icon: '/favicon.svg'
	},
	keywords: ['health', 'wellness', 'Iowa', 'nutrition', 'coaching']
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
	const heroSection = sections[0].sectionFields
	const treatmentsSection = sections[1].sectionFields
	const benefitsSection = sections[2].sectionFields

	// Treatments
	const treatments = await getTreatments()

	// Benefits
	const benefits = await getBenefits()

	// Reviews
	const reviews = await getReviews()

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
		</main>
	)
}
