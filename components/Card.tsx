// styles
import styles from './Card.module.scss'

// components
import Image from 'next/image'
import Button from './Button'

interface Props {
	title: string
	subtitle?: string
	image: string
	smallImage?: true
	underline?: true
	left?: true
	button?: true
}

const Card: React.FC<Props> = ({
	title,
	subtitle,
	image,
	underline,
	left,
	button,
	smallImage
}) => {
	const textStyle = left ? '' : styles.center

	return (
		<div className={styles.card}>
			<div
				className={styles.image}
				style={{ width: smallImage ? '50%' : '100%' }}
			>
				<Image src={image} alt={title} fill objectFit='cover' />

				{underline && <div className={styles.underline}></div>}
			</div>

			<div className={styles.text}>
				<h3 className={textStyle}>{title}</h3>
				{subtitle && <p className={textStyle}>{subtitle}</p>}
			</div>

			{button && (
				<Button
					text='View Treatment'
					secondary={false}
					link={`/treatment/${title}`}
				/>
			)}
		</div>
	)
}

export default Card
