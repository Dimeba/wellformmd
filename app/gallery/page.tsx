import { getPageById, getSectionById } from '@/graphql/queries'
import Hero from '../../components/Hero'

export default async function BlogSlugPage() {
	const page = await getPageById('cG9zdDo1MjE=')
	const sections = []

	// Getting the sections
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
