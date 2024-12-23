import type { Metadata } from 'next'

// components
import Hero from '@/components/Hero'

// queries
import { getPageById, getSectionById, getTreatments } from '@/graphql/queries'

// metadata
export const metadata: Metadata = {
	title: 'Wellform MD - About Us'
}

export default async function About() {
	const page = await getPageById('cG9zdDo1MjA=')
	const sections = []

	if (page.pageFields.sections && page.pageFields.sections.edges) {
		for (const edge of page.pageFields.sections.edges) {
			const section = await getSectionById(edge.node.id)
			sections.push(section)
		}
	}

	const heroSection = sections[0]?.sectionFields

	return (
		<div>
			<Hero
				subtitle={heroSection?.subtitle || ''}
				title={heroSection?.title || ''}
			/>
		</div>
	)
}
