import { getGraphQLClient } from '@/lib/graphql-client'
import { gql } from 'graphql-request'

const client = getGraphQLClient()

// pages
export async function getPageById(id: string) {
	const query = gql`
		query GetPage($id: ID!) {
			page(id: $id, idType: URI) {
				title
				pageFields {
					sections {
						edges {
							node {
								id
							}
						}
					}
				}
			}
		}
	`

	const data = await client.request<{
		page: {
			title: string
			pageFields: {
				sections: {
					edges: {
						node: {
							id: string
						}
					}[]
				}
			}
		}
	}>(query, { id })

	return data.page
}

// sections
export async function getSectionById(id: string) {
	const query = gql`
		query GetSection($id: ID!) {
			section(id: $id) {
				sectionFields {
					addButtons
					addPosts
					image {
						node {
							link
						}
					}
					subtitle
					text
					title
					posts {
						nodes {
							id
						}
					}
					buttons {
						nodes {
							id
						}
					}
				}
			}
		}
	`

	const data = await client.request<{
		section: {
			sectionFields: {
				addButtons: boolean
				addPosts: boolean
				image: {
					node: {
						link: string
					}
				}
				subtitle: string
				text: string
				title: string
				posts: {
					nodes: {
						id: string
					}[]
				}
				buttons: {
					nodes: {
						id: string
					}[]
				}
			}
		}
	}>(query, { id })

	return data.section
}
