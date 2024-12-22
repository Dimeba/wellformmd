//queries
import { getPageById, getSectionById, getTreatments } from '@/graphql/queries'

//components
import Hero from '../../components/Hero'

export default async function AboutSlugPage() {
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
