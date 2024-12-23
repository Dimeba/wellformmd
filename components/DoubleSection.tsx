// styles
import styles from './DoubleSection.module.scss'

// components
import SectionTitle from './SectionTitle'
import Button from './Button'
import Image from 'next/image'
import AnimatedDiv from './AnimatedDiv'

interface Props {
	title: string
	subtitle?: string
	text?: string
	smallText?: string
	image?: string
	image2?: string
	reverse?: boolean
	button1?: {
		text: string
		link: string
	}
	button2?: {
		text: string
		link: string
	}
	green?: boolean
	subscribe?: boolean
}

const DoubleSection: React.FC<Props> = ({
	title,
	subtitle,
	text,
	smallText,
	image,
	image2,
	reverse,
	button1,
	button2,
	green,
	subscribe
}) => {
	return (
		<section
			className={`${styles.doubleSection} ${green ? styles.green : ''}`}
			style={{ flexDirection: reverse ? 'row-reverse' : 'row' }}
		>
			{/* Text */}
			<div
				className={styles.column}
				style={{ justifyContent: reverse ? 'flex-start' : 'flex-end' }}
			>
				<AnimatedDiv cssClass={styles.columnContent}>
					<SectionTitle
						title={title}
						subtitle={subtitle}
						text={text}
						leftAlign
					/>

					{button1 && (
						<div className={styles.buttons}>
							<Button text={button1.text} link={button1.link} />
							{button2 && (
								<Button text={button2.text} link={button2.link} secondary />
							)}
						</div>
					)}

					{subscribe && (
						<div className={styles.subscribeForm}>
							<input type='email' placeholder='Enter your e-mail' />
							<button>Subscribe</button>
						</div>
					)}

					{smallText && <p className={styles.smallText}>{smallText}</p>}
				</AnimatedDiv>
			</div>

			{/* Images */}
			{image2 && image ? (
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
							sizes='(max-width: 768px) 100vw, 50vw'
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
									sizes='(max-width: 768px) 100vw, 50vw'
								/>
							</div>
						</div>
					</div>
				</div>
			) : (
				// Single image
				<div className={styles.column}>
					<div className={styles.singleImage}>
						{image && (
							<Image
								src={image}
								alt={`${title} image.`}
								fill
								style={{ objectFit: 'cover' }}
								sizes='(max-width: 768px) 100vw, 50vw'
							/>
						)}
					</div>
				</div>
			)}
		</section>
	)
}

export default DoubleSection
