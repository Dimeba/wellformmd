// styles
import styles from './TeamMemberCard.module.scss'

// components
import AnimatedDiv from './AnimatedDiv'
import Image from 'next/image'
import Button from './Button'

interface Props {
	title: string
	bio: string
	image: string
}

const TeamMemberCard: React.FC<Props> = ({ title, image, bio }) => {
	return (
		<AnimatedDiv cssClass={styles.teamMemberCard}>
			<div className={styles.image}>
				<Image
					src={image}
					alt={title}
					fill
					style={{ objectFit: 'cover' }}
					sizes='(max-width: 768px) 100vw, 50vw'
				/>
			</div>

			<div className={styles.text}>
				<h3>{title}</h3>
				<p>{bio}</p>
				<Button link='/' text='Book Consultation' />
			</div>
		</AnimatedDiv>
	)
}

export default TeamMemberCard
