// styles
import styles from './Reviews.module.scss'

// components
import Image from 'next/image'

// types
import { Review } from '@/types/contentTypes'
import { it } from 'node:test'

interface Props {
	content: Review[]
}

const Reviews: React.FC<Props> = ({ content }) => {
	return (
		<section className={styles.reviews}>
			<div className={`container ${styles.reviewsContainer}`}>
				{content.map(item => {
					const width = item.node.reviewFields.image.node.mediaDetails.width
					const height = item.node.reviewFields.image.node.mediaDetails.height
					const ratio = width / height

					return (
						<div
							className={styles.image}
							key={item.node.id}
							style={{ height: '100px', width: `${100 * ratio}px` }}
						>
							<Image
								src={item.node.reviewFields.image.node.link}
								alt={item.node.title}
								fill
								style={{ objectFit: 'cover' }}
							/>
						</div>
					)
				})}
			</div>
		</section>
	)
}

export default Reviews
