import type { Metadata } from 'next'

// components
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import DoubleSection from '@/components/DoubleSection'
import Reviews from '@/components/Reviews'
import RichTextSection from '@/components/RichTextSection'

// queries
import {
	getPageById,
	getSectionById,
	getReviews,
	getTeamMembers,
	getImages,
	getPageAndSections
} from '@/graphql/queries'

// metadata
export const metadata: Metadata = {
	title: 'Wellform MD - About Us'
}

export default async function About() {
	const data = await getPageAndSections('cG9zdDo1MjA=')

	const { props } = data

	const sections = props.sections

	// Sections
	const heroSection = sections[0]?.node.sectionFields
	const customTextSection = sections[2]?.node.sectionFields
	const locationSection = sections[1]?.node.sectionFields

	// Reviews
	const reviews = await getReviews()
	// Team members
	const teamMembers = await getTeamMembers()
	// Images
	const images = await getImages()
	const filteredImages = images?.filter(
		image => image?.node.imageFields.addToAbout == true
	)

	return (
		<main>
			<Hero subtitle={heroSection?.subtitle} title={heroSection?.title} />

			<RichTextSection content={customTextSection?.customText} />

			{/* images */}
			<Section
				title='Gallery'
				cardsColumns={3}
				cardsContent={filteredImages}
				slider
				fullWidth
				hideTitle
			/>

			{/* team */}
			<Section
				title='Meet our Physicians'
				subtitle='OurTeam'
				cardsColumns={2}
				cardsContent={teamMembers}
				bottomButtons
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
					link: 'https://maps.app.goo.gl/znSkAUfL7sD66SKp9'
				}}
			/>
		</main>
	)
}
