import { getGraphQLClient } from '@/lib/graphql-client'
import { gql } from 'graphql-request'

// types
import {
	Treatments,
	Section,
	Page,
	Benefits,
	Reviews,
	Articles,
	Testimonials,
	Article,
	Specials,
	TeamMembers,
	Images
} from '@/types/contentTypes'

const client = getGraphQLClient()

// pages
export async function getPageById(id: string) {
	const query = gql`
		query GetPage($id: ID!) {
			page(id: $id) {
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
					image2 {
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
					customText
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

// benefits
export async function getBenefits() {
	const query = gql`
		query GetBenefits {
			benefits {
				edges {
					node {
						id
						title
						benefitFields {
							image {
								node {
									link
								}
							}
							subtitle
						}
					}
				}
			}
		}
	`

	const data = await client.request<Benefits>(query)

	return data.benefits.edges
}

// reviews
export async function getReviews() {
	const query = gql`
		query GetReviews {
			reviews {
				edges {
					node {
						id
						title
						reviewFields {
							image {
								node {
									link
									mediaDetails {
										width
										height
									}
								}
							}
						}
					}
				}
			}
		}
	`

	const data = await client.request<Reviews>(query)

	return data.reviews.edges
}

// articles
export async function getArticles() {
	const query = gql`
		query GetArticles {
			articles {
				edges {
					node {
						id
						title
						articleFields {
							category
							image {
								node {
									link
								}
							}
							text
						}
					}
				}
			}
		}
	`

	const data = await client.request<Articles>(query)

	return data.articles.edges
}

// testimonials
export async function getTestimonials() {
	const query = gql`
		query GetTestimonials {
			testimonials {
				edges {
					node {
						id
						title
						testimonialFields {
							text
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

	const data = await client.request<Testimonials>(query)

	return data.testimonials.edges
}

// specials
export async function getSpecials() {
	const query = gql`
		query GetSpecials {
			specials {
				edges {
					node {
						id
						title
						specialFields {
							subtitle
							text
							link
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

	const data = await client.request<Specials>(query)

	return data.specials.edges
}

// specials
export async function getTeamMembers() {
	const query = gql`
		query GetTeamMembers {
			teamMembers {
				edges {
					node {
						id
						title
						teamMemberFields {
							bio
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

	const data = await client.request<TeamMembers>(query)

	return data.teamMembers.edges
}

// images
export async function getImages() {
	const query = gql`
		query GetMedia {
			mediaItems(first: 500) {
				edges {
					node {
						id
						link
						imageFields {
							addToAbout
							addToGallery
						}
					}
				}
			}
		}
	`

	const data = await client.request<Images>(query)

	return data.mediaItems.edges
}
