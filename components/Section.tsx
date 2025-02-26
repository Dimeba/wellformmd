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
	cardsColumns?: 1 | 2 | 3 | 4
	cardsContent?: any
	cardsFlex?: true
	bottomButtons?: true
	slider?: true
	hideTitle?: true
	fullWidth?: true
}

const Section: React.FC<Props> = ({
	title,
	subtitle,
	text,
	cardsColumns,
	cardsContent,
	cardsFlex,
	bottomButtons,
	slider,
	hideTitle,
	fullWidth
}) => {
	return (
		<section>
			<div className={`${fullWidth ? styles.fullWidth : 'container'}`}>
				{!hideTitle && (
					<SectionTitle
						title={title}
						subtitle={subtitle}
						text={text}
						hideDivider={text == undefined}
					/>
				)}

				{cardsContent && (
					<Cards
						columns={cardsColumns ? cardsColumns : 4}
						content={cardsContent}
						cardsFlex={cardsFlex}
						slider={slider}
						fullWidth={fullWidth}
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
