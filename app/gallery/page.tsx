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
	getReviews,
	getImages,
	getPageAndSections
} from '@/graphql/queries'

// metadata
export const metadata: Metadata = {
	title: 'Wellform MD - Gallery'
}

export default async function Gallery() {
	const data = await getPageAndSections('cG9zdDo1MjE=')

	const { props } = data

	const sections = props.sections

	// Sections
	const heroSection = sections[0]?.node.sectionFields
	const locationSection = sections[1]?.node.sectionFields

	// Reviews
	const reviews = await getReviews()
	// Images
	const images = await getImages()
	const filteredImages = images?.filter(
		image => image?.node.imageFields.addToGallery == true
	)

	return (
		<main>
			<Hero
				subtitle={heroSection?.subtitle || ''}
				title={heroSection?.title || ''}
			/>

			{/* images */}
			<Section
				title='Gallery'
				cardsColumns={3}
				cardsContent={filteredImages}
				hideTitle
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
					link: 'https://maps.app.goo.gl/Qjy9GdbbLW6b3qVq9'
				}}
			/>
		</main>
	)
}
