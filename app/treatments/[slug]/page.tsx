import { getTreatments } from '@/graphql/queries'
import { notFound } from 'next/navigation'

interface PageProps {
	params: {
		slug: string
	}
}

function createSlug(title: string) {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9 ]/g, '')
		.replace(/\s+/g, '-')
}

export async function generateStaticParams() {
	const treatments = await getTreatments()

	return treatments.map(({ node }) => ({
		slug: createSlug(node.title)
	}))
}

export default async function TreatmentsSlugPage({ params }: PageProps) {
	const { slug } = params

	const treatments = await getTreatments()

	const treatment = treatments.find(
		({ node }) => createSlug(node.title) === slug
	)

	if (!treatment) {
		notFound()
	}

	console.log(treatment.node.title)

	return <main></main>
}
