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
			image2: {
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
export type Benefits = {
	benefits: {
		edges: Benefit[]
	}
}

export type Benefit = {
	node: {
		id: string
		title: string
		benefitFields: {
			image: {
				node: {
					link: string
				}
			}
			subtitle: string
		}
	}
}

// Reviews
export type Reviews = {
	reviews: {
		edges: Review[]
	}
}

export type Review = {
	node: {
		id: string
		title: string
		reviewFields: {
			image: {
				node: {
					link: string
					mediaDetails: {
						width: number
						height: number
					}
				}
			}
		}
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
