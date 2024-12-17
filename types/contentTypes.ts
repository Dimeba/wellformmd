export type Treatments = {
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

export type Benefits = {
	node: {
		id: string
		title: string
	}
}

export type Testimonials = {
	node: {
		id: string
		title: string
	}
}

export type Articles = {
	node: {
		id: string
		title: string
	}
}

export type Team = {
	node: {
		id: string
		title: string
	}
}
