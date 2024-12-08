// temps components
import Button from '@/components/Button'
import SectionTitle from '@/components/SectionTitle'
import Cards from '@/components/Cards'

export default function Home() {
	return (
		<main>
			<div className='container'>
				<Cards columns={4} />
			</div>

			<div className='container'>
				<Cards columns={3} slider />
			</div>
		</main>
	)
}
