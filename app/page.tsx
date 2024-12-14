// temps components
import Button from '@/components/Button'
import SectionTitle from '@/components/SectionTitle'
import Cards from '@/components/Cards'

// temp data
import { getGraphQLClient } from '@/lib/graphql-client'
import { gql } from 'graphql-request'

export default async function Home() {
	const client = getGraphQLClient()

	const query = gql`
		query GetPosts {
			posts {
				edges {
					node {
						id
						title
					}
				}
			}
		}
	`

	// Execute the GraphQL query
	const data = await client.request<{
		posts: { edges: { node: { id: string; title: string } }[] }
	}>(query)
	const { posts } = data

	console.log(posts)

	return (
		<main>
			<div className='container'>
				<Cards columns={4} />
			</div>

			<div className='container'>
				<Cards columns={3} slider />
			</div>
		</main>
	)
}
