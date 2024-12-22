// styles
import styles from './SectionTitle.module.scss'

// components
import AnimatedDiv from './AnimatedDiv'

interface Props {
	title: string
	subtitle?: string
	text?: string
	hideDivider?: boolean | undefined
	leftAlign?: true | undefined
	white?: true | undefined
}

const SectionTitle: React.FC<Props> = ({
	title,
	subtitle,
	text,
	hideDivider,
	leftAlign,
	white
}) => {
	const textStyles: React.CSSProperties = {
		textAlign: leftAlign ? 'left' : 'center'
	}

	return (
		<AnimatedDiv
			cssClass={`${styles.sectionTitle} ${
				leftAlign ? styles.left : styles.center
			} ${white ? styles.white : ''}`}
		>
			{subtitle && <h4 style={textStyles}>{subtitle}</h4>}
			<h2 style={textStyles}>{title}</h2>
			{!hideDivider && <hr />}
			{text && <p style={textStyles}>{text}</p>}
		</AnimatedDiv>
	)
}

export default SectionTitle
