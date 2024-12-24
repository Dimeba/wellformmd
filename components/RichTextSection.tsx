// styles
import styles from './RichTextSection.module.scss'

interface Props {
	content: string
}

const RichTextSection: React.FC<Props> = ({ content }) => {
	return (
		<section>
			<div
				className={`container ${styles.richText}`}
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</section>
	)
}

export default RichTextSection
