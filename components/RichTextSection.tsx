interface Props {
	content: string
}

const RichTextSection: React.FC<Props> = ({ content }) => {
	return (
		<section>
			<div
				className='container richText'
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</section>
	)
}

export default RichTextSection
