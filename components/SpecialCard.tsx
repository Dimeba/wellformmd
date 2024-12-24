// styles
import styles from './SpecialCard.module.scss'

// components
import AnimatedDiv from './AnimatedDiv'
import SectionTitle from './SectionTitle'
import Image from 'next/image'
import Button from './Button'

interface Props {
	title: string
	subtitle: string
	text: string
	image: string
	button: {
		text: string
		link: string
	}
	index: number
}

const SpecialCard: React.FC<Props> = ({
	title,
	subtitle,
	text,
	image,
	button,
	index
}) => {
	return (
		<div
			className={index == 0 ? styles.firstCard : styles.specialCard}
			style={{ backgroundImage: index == 0 ? `url(${image})` : 'none' }}
		>
			{index != 0 && (
				<div className={styles.image}>
					<Image src={image} alt={title} fill style={{ objectFit: 'cover' }} />
				</div>
			)}

			<AnimatedDiv cssClass={styles.text}>
				<SectionTitle
					title={title}
					subtitle={subtitle}
					text={text}
					leftAlign={index != 0}
				/>
				<Button text={button.text} link={button.link} />
			</AnimatedDiv>
		</div>
	)
}

export default SpecialCard
