import { getGraphQLClient } from '@/lib/graphql-client'
import { gql } from 'graphql-request'

// types
import { Treatments, Section, Page } from '@/types/contentTypes'

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

	const data = await client.request<Page>(query, { id })

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

	const data = await client.request<Section>(query, { id })

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

	const data = await client.request<Treatments>(query)

	return data.treatments.edges
}
