// styles
import styles from './DoubleSection.module.scss'

// components
import SectionTitle from './SectionTitle'
import Button from './Button'
import Image from 'next/image'

interface Props {
	title: string
	subtitle?: string
	text?: string
	smallText?: string
	image?: string
	image2?: string
	reverse?: boolean
}

const DoubleSection: React.FC<Props> = ({
	title,
	subtitle,
	text,
	smallText,
	image,
	image2,
	reverse
}) => {
	return (
		<section
			className={styles.doubleSection}
			style={{ flexDirection: reverse ? 'row-reverse' : 'row' }}
		>
			{/* Text */}
			<div
				className={styles.column}
				style={{ justifyContent: reverse ? 'flex-start' : 'flex-end' }}
			>
				<div className={styles.columnContent}>
					<SectionTitle
						title={title}
						subtitle={subtitle}
						text={text}
						leftAlign
					/>

					<div className={styles.buttons}>
						<Button text='Book now' link='/' />
						<Button text='Book now' link='/' secondary />
					</div>

					<p className={styles.smallText}>{smallText}</p>
				</div>
			</div>

			{/* Images */}
			{image2 && image && (
				<div
					className={styles.column}
					style={{
						justifyContent: reverse ? 'flex-end' : 'flex-start'
					}}
				>
					<div
						className={`${styles.columnContent} ${styles.images}`}
						style={
							reverse
								? { borderTopLeftRadius: '250px' }
								: { borderTopRightRadius: '250px' }
						}
					>
						{/* Image 1 */}
						<Image
							src={image}
							alt={`${title} image.`}
							fill
							style={{ objectFit: 'cover' }}
						/>

						{/* Image 2 */}
						<div
							className={styles.image2}
							style={
								reverse
									? { right: '0', borderLeft: '1rem solid white' }
									: { left: '0', borderRight: '1rem solid white' }
							}
						>
							<div
								style={{ position: 'relative', height: '100%', width: '100%' }}
							>
								<Image
									src={image2}
									alt={`${title} image.`}
									fill
									style={{ objectFit: 'cover' }}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	)
}

export default DoubleSection
