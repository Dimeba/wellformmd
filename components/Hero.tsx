// styles
import styles from './Hero.module.scss'

import Button from './Button'
import SectionTitle from './SectionTitle'
import AnimatedDiv from './AnimatedDiv'
interface Props {
	title: string
	subtitle?: string
	text?: string
	image?: string
	fullHeight?: boolean
	isHomepage?: boolean
	leftAlign?: boolean
}

const Hero: React.FC<Props> = ({
	title,
	subtitle,
	text,
	image,
	fullHeight,
	isHomepage,
	leftAlign
}) => {
	return (
		<section
			className={`${styles.hero} ${isHomepage ? styles.heroBackground : ''}`}
			style={{
				backgroundImage: image ? `url(${image})` : 'none',
				height: fullHeight ? '100vh' : 'auto',
				justifyContent: isHomepage ? 'center' : 'flex-end',
				paddingTop: isHomepage ? '' : '240px'
			}}
		>
			<AnimatedDiv cssClass='container'>
				{isHomepage ? (
					<div className={`${isHomepage ? styles.heroHomepage : ''}`}>
						<h1>{title}</h1>
						<p className={styles.subtitle}>{subtitle}</p>
						<p>{text}</p>
					</div>
				) : (
					<SectionTitle
						title={title}
						subtitle={subtitle}
						hideDivider
						bigTitle
						leftAlign={leftAlign}
					/>
				)}

				{isHomepage && (
					<div className={styles.buttons}>
						<Button
							text='Book a FREE Consultation'
							link='/book-now'
							secondary={false}
						/>
						<Button text='Our treatments' link='/book-now' secondary={true} />
					</div>
				)}
			</AnimatedDiv>
		</section>
	)
}

export default Hero
