// Pages
export type Page = {
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
}

// Sections
export type Section = {
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
}

// Treatements
export type Treatments = {
	treatments: {
		edges: Treatment[]
	}
}

export type Treatment = {
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
}

// Benefits
export type Benefit = {
	node: {
		id: string
		title: string
	}
}

// Testimonials
export type Testimonial = {
	node: {
		id: string
		title: string
	}
}

// Articles
export type Article = {
	node: {
		id: string
		title: string
	}
}

// Team
export type TeamMember = {
	node: {
		id: string
		title: string
	}
}
