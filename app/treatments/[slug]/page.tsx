import { getTreatments } from '@/graphql/queries'
import { notFound } from 'next/navigation'

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

interface Params {
	slug: string
}

export default async function TreatmentsSlugPage({
	params
}: {
	params: Params
}) {
	const slug = params.slug

	const treatments = await getTreatments()

	const treatment = treatments.find(
		({ node }) => createSlug(node.title) === slug
	)

	if (!treatment) {
		notFound()
	}

	return <main></main>
}
