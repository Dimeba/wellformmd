import { Metadata } from 'next'
import { getArticles, getSectionById } from '@/graphql/queries'
import { notFound } from 'next/navigation'

// components
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import IndividalPageContent from '@/components/IndividalPageContent'
import DoubleSection from '@/components/DoubleSection'

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

// metadata
export async function generateMetadata({
	params
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const articles = await getArticles()
	const slug = (await params).slug
	const article = articles.find(
		({ node }: { node: { title: string } }) => createSlug(node.title) === slug
	)

	if (!article) {
		return {
			title: 'Article Not Found'
		}
	}

	return {
		title: article.node.title
	}
}

export default async function BlogSlugPage({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const slug = (await params).slug

	const articles = await getArticles()
	const article = articles.find(
		({ node }: { node: { title: string } }) => createSlug(node.title) === slug
	)
	const recommendedArticles = articles.filter(a => a !== article).slice(0, 3)
	const banner = await getSectionById('cG9zdDoyMTY0')

	if (!article) {
		notFound()
	}

	return (
		<main>
			{/* Hero */}
			<Hero
				title={article.node.title}
				image={article.node.articleFields.image.node.link}
				hideText
			/>

			{/* Content */}
			<IndividalPageContent
				title={article.node.title}
				subtitle={article.node.articleFields.category}
				text={article.node.articleFields.text}
			/>

			{/* Banner Section */}
			<DoubleSection
				title={banner?.sectionFields.title}
				text={banner?.sectionFields.text}
				button1={{ text: 'Request FREE Consultation', link: '/' }}
				image={banner?.sectionFields.image.node.link}
				banner
			/>

			{/* Related Posts */}
			<Section
				title='Related Posts'
				subtitle='Our Blog'
				cardsContent={recommendedArticles}
				cardsColumns={3}
			/>
		</main>
	)
}
