// temps components
import Hero from '@/components/Hero'
import Button from '@/components/Button'
import SectionTitle from '@/components/SectionTitle'
import Cards from '@/components/Cards'

// queries
import { getPageById, getSectionById } from '@/graphql/queries'

export const metadata = {
	title: 'Weight Loss and Wellness',
	description: 'Health and Wellness',
	icons: {
		icon: '/favicon.svg'
	},
	keywords: ['health', 'wellness', 'Iowa', 'nutrition', 'coaching']
}

export default async function Home() {
	// Getting the page
	const page = await getPageById('/')
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

	return (
		<main>
			<Hero title={heroSection.title} />

			<section>
				<div className='container'>
					<SectionTitle
						title={treatmentsSection.title}
						subtitle={treatmentsSection.subtitle}
					/>
					<Cards columns={4} />
				</div>
			</section>

			{/* <div className='container'>
				<Cards columns={3} slider />
			</div> */}
		</main>
	)
}
