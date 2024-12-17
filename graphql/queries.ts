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
					addPosts
					image {
						node {
							link
						}
					}
					subtitle
					text
					smallText
					title
					posts {
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
				addPosts: boolean
				image: {
					node: {
						link: string
					}
				}
				subtitle: string
				text: string
				smallText: string
				title: string
				posts: {
					nodes: {
						id: string
					}[]
				}
			}
		}
	}>(query, { id })

	return data.section
}

// treatements
export async function getTreatments() {
	const query = gql`
		query GetTreatments {
			treatments {
				edges {
					node {
						id
						title
						treatmentFields {
							subtitle
							image {
								node {
									link
								}
							}
						}
					}
				}
			}
		}
	`

	const data = await client.request<{
		treatments: {
			edges: {
				node: {
					id: string
					title: string
					treatmentFields: {
						subtitle: string
						image: {
							node: {
								link: string
							}
						}
					}
				}
			}[]
		}
	}>(query)

	return data.treatments.edges
}
