// styles
import styles from './Section.module.scss'

// components
import SectionTitle from './SectionTitle'
import Cards from './Cards'
import Button from './Button'

interface Props {
	title: string
	subtitle?: string
	text?: string
	cardsColumns?: 3 | 4
	cardsContent?: any
	bottomButtons?: true
}

const Section: React.FC<Props> = ({
	title,
	subtitle,
	text,
	cardsColumns,
	cardsContent,
	bottomButtons
}) => {
	return (
		<section>
			<div className='container'>
				<SectionTitle title={title} subtitle={subtitle} text={text} />

				{cardsContent && (
					<Cards
						columns={cardsColumns ? cardsColumns : 4}
						content={cardsContent}
					/>
				)}

				{bottomButtons && (
					<div className={styles.bottomButtons}>
						<Button
							text='View Treatments'
							secondary={false}
							link='/treatments'
						/>
						<Button text='Special Deals' secondary={true} link='/specials' />
					</div>
				)}
			</div>
		</section>
	)
}

export default Section
