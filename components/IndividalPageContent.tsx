// styles
import styles from './IndividalPageContent.module.scss'

// components
import SectionTitle from './SectionTitle'

interface Props {
	title: string
	subtitle: string
	text: string
}

const IndividalPageContent: React.FC<Props> = ({ title, subtitle, text }) => {
	return (
		<section>
			<div className={`container ${styles.content}`}>
				<SectionTitle title={title} subtitle={subtitle} />
				<div
					style={{ marginTop: '2rem' }}
					className='richText'
					dangerouslySetInnerHTML={{ __html: text }}
				/>
			</div>
		</section>
	)
}

export default IndividalPageContent
