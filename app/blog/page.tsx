import type { Metadata } from 'next'

// components
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import DoubleSection from '@/components/DoubleSection'

// queries
import {
	getPageById,
	getSectionById,
	getArticles,
	getTestimonials
} from '@/graphql/queries'

// metadata
export const metadata: Metadata = {
	title: 'Wellform MD - Blog'
}

export default async function Blog() {
	const page = await getPageById('cG9zdDoxNTIz')

	const edges = page?.pageFields?.sections?.edges ?? []
	const sectionIds = edges.map(edge => edge.node.id)

	// Fetch all sections in parallel
	const sections = await Promise.all(sectionIds.map(id => getSectionById(id)))

	// Sections
	const heroSection = sections[0]?.sectionFields
	const subscribeSection = sections[1]?.sectionFields
	const testimonialsSection = sections[2]?.sectionFields

	// Articles
	const articles = await getArticles()
	const match = articles[0].node.articleFields.text.match(/>(.*?)</)
	const finalText = match ? match[1] : ''

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

			{/* Latest Post */}
			<DoubleSection
				title={articles[0].node.title}
				subtitle={articles[0].node.articleFields.category}
				text={`${finalText}...`}
				image={articles[0].node.articleFields.image.node.link}
				reverse
				button1={{
					link: `/blog/${articles[0].node.title
						.toLowerCase()
						.replace(/[^a-z0-9 ]/g, '')
						.replace(/ /g, '-')}`,
					text: 'Read Article'
				}}
			/>

			{/* Posts */}
			<Section
				title='Latest Posts'
				subtitle='Our Blog'
				cardsContent={articles}
				cardsColumns={4}
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

			{/* testimonials */}
			<Section
				title={testimonialsSection?.title}
				subtitle={testimonialsSection?.subtitle}
				cardsContent={testimonials}
				cardsColumns={4}
				slider
			/>
		</main>
	)
}
