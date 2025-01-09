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

export type PageAndSections = {
	page: {
		id: string
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
	sections: {
		edges: {
			node: {
				id: string
				title: string
				sectionFields: {
					title: string
					subtitle: string
					text: string
					smallText: string
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
					customText: string
				}
			}
		}[]
	}
}

// Sections
export type Sections = {
	sections: {
		edges: {
			node: {
				id: string
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
					customText: string
				}
			}[]
		}
	}
}

export type Section = {
	section: {
		id: string
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
			customText: string
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
			text: string
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
export type Testimonials = {
	testimonials: {
		edges: Testimonial[]
	}
}

export type Testimonial = {
	node: {
		id: string
		title: string
		testimonialFields: {
			text: string
			image: {
				node: {
					link: string
				}
			}
		}
	}
}

// Articles
export type Articles = {
	articles: {
		edges: Article[]
	}
}

export type Article = {
	node: {
		id: string
		title: string
		articleFields: {
			category: string
			image: {
				node: {
					link: string
				}
			}
			text: string
		}
	}
}

// Treatements
export type Specials = {
	specials: {
		edges: Special[]
	}
}

export type Special = {
	node: {
		id: string
		title: string
		specialFields: {
			subtitle: string
			text: string
			link: string
			image: {
				node: {
					link: string
				}
			}
		}
	}
}

// Team
export type TeamMembers = {
	teamMembers: {
		edges: TeamMember[]
	}
}

export type TeamMember = {
	node: {
		id: string
		title: string
		teamMemberFields: {
			bio: string
			image: {
				node: {
					link: string
				}
			}
		}
	}
}

// Images
export type Images = {
	mediaItems: {
		edges: Image[]
	}
}

export type Image = {
	node: {
		id: string
		link: string
		imageFields: {
			addToAbout: boolean
			addToGallery: boolean
		}
	}
}

// Menu
export type Menu = {
	menu: {
		id: string
		menuItems: {
			edges: {
				node: {
					label: string
				}
			}
		}
	}
}
