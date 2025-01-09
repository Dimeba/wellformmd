import type { Metadata } from 'next'

// components
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import DoubleSection from '@/components/DoubleSection'

// queries
import {
	getPageById,
	getSectionById,
	getSpecials,
	getPageAndSections
} from '@/graphql/queries'

// metadata
export const metadata: Metadata = {
	title: 'Wellform MD - Specials'
}

export default async function Specials() {
	const data = await getPageAndSections('cG9zdDoxNTM4')

	const { props } = data

	const sections = props.sections

	const heroSection = sections[0]?.node.sectionFields
	const subscribeSection = sections[1]?.node.sectionFields
	const locationSection = sections[2]?.node.sectionFields

	// Specials
	const specials = await getSpecials()

	return (
		<main>
			<Hero
				subtitle={heroSection?.subtitle || ''}
				title={heroSection?.title || ''}
			/>

			{/* specials */}
			<Section
				title='Specials'
				cardsContent={specials}
				cardsColumns={1}
				hideTitle
			/>

			{/* subscribe section */}
			<DoubleSection
				title={subscribeSection?.title}
				subtitle={subscribeSection?.subtitle}
				text={subscribeSection?.text}
				image={subscribeSection?.image.node.link}
				green
				subscribe
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
