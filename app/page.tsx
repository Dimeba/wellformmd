// temps components
import Hero from '@/components/Hero'
import Button from '@/components/Button'
import SectionTitle from '@/components/SectionTitle'
import Cards from '@/components/Cards'

// temp data
/* import { getGraphQLClient } from '@/lib/graphql-client'
 */ import { gql } from 'graphql-request'

export const metadata = {
	title: 'Weight Loss and Wellness',
	description: 'Health and Wellness',
	icons: {
		icon: '/favicon.svg'
	},
	keywords: ['health', 'wellness', 'Iowa', 'nutrition', 'coaching']
}
export default async function Home() {
	/* 	const client = getGraphQLClient()

	const query = gql`
		query GetHomepage {
			page(id: "/", idType: URI) {
				title
				homepageFields {
					heroTitle
					heroSubtitle
					heroText
				}
			}
		}
	`

	// Execute the GraphQL query
	const data = await client.request<{
		page: {
			title: string
			homepageFields: {
				heroTitle: string
				heroSubtitle: string
				heroText: string
			}
		}
	}>(query)
	const { page } = data

	console.log(page.homepageFields.heroTitle) */

	return (
		<main>
			<Hero />

			<div className='container'>
				<Cards columns={4} />
			</div>

			<div className='container'>
				<Cards columns={3} slider />
			</div>
		</main>
	)
}
