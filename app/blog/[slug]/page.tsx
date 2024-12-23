import { getArticles } from '@/graphql/queries'
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
	const articles = await getArticles()

	return articles.map(({ node }: { node: { title: string } }) => ({
		slug: createSlug(node.title)
	}))
}

export default async function BlogSlugPage({ params }: PageProps) {
	const slug = params.slug

	const articles = await getArticles()
	const article = articles.find(
		({ node }: { node: { title: string } }) => createSlug(node.title) === slug
	)

	if (!article) {
		notFound()
	}

	return <main>...</main>
}
