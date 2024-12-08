// styles
import styles from './SectionTitle.module.scss'

// components
import AnimatedDiv from './AnimatedDiv'

interface Props {
	title: string
	subtitle: string
	hideDivider?: true | undefined
	leftAlign?: true | undefined
	white?: true | undefined
}

const SectionTitle: React.FC<Props> = ({
	title,
	subtitle,
	hideDivider,
	leftAlign,
	white
}) => {
	return (
		<AnimatedDiv
			cssClass={`${styles.sectionTitle} ${
				leftAlign ? styles.left : styles.center
			} ${white ? styles.white : ''}`}
		>
			<h4>{subtitle}</h4>
			<h2>{title}</h2>
			{!hideDivider && <hr />}
		</AnimatedDiv>
	)
}

export default SectionTitle
