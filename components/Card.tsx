// styles
import styles from './Card.module.scss'

// components
import Image from 'next/image'
import Button from './Button'
import AnimatedDiv from './AnimatedDiv'

interface Props {
	title: string
	subtitle?: string
	image: string
	smallImage?: true
	underline?: true
	left?: true
	buttonText?: string
	rectangle?: true
	folder?: string
}

const Card: React.FC<Props> = ({
	title,
	subtitle,
	image,
	rectangle,
	underline,
	left,
	buttonText,
	smallImage,
	folder
}) => {
	const textStyle = left ? '' : styles.center

	return (
		<AnimatedDiv cssClass={styles.card}>
			<div
				className={styles.image}
				style={{
					width: smallImage ? '50%' : '100%',
					aspectRatio: rectangle ? '16/10' : '1/1'
				}}
			>
				<Image src={image} alt={title} fill objectFit='cover' />

				{underline && <div className={styles.underline}></div>}
			</div>

			<div className={styles.text}>
				<h3 className={textStyle}>{title}</h3>
				{subtitle && <p className={textStyle}>{subtitle}</p>}
			</div>

			{buttonText && (
				<Button
					text={buttonText}
					link={`/${folder}/${title
						.toLowerCase()
						.replace(/[^a-z0-9 ]/g, '')
						.replace(/ /g, '-')}`}
				/>
			)}
		</AnimatedDiv>
	)
}

export default Card
