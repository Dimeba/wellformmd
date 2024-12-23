// styles
import styles from './Testimonial.module.scss'

// components
import { FaStar } from 'react-icons/fa'
import { FaQuoteLeft } from 'react-icons/fa'
import Image from 'next/image'

interface Props {
	text: string
	name: string
	image: string
}

const Testimonial: React.FC<Props> = ({ text, name, image }) => {
	return (
		<div className={styles.testimonial}>
			<FaQuoteLeft size={30} fill='#2e7e7f' />

			<div>
				<FaStar size={22} fill='#ead31e' />
				<FaStar size={22} fill='#ead31e' />
				<FaStar size={22} fill='#ead31e' />
				<FaStar size={22} fill='#ead31e' />
				<FaStar size={22} fill='#ead31e' />
			</div>

			<p>{text}</p>

			<div className={styles.person}>
				<Image
					src={image}
					alt={`${name}'s portrait.`}
					width={60}
					height={60}
					style={{ borderRadius: '100px' }}
				/>
				<p>{name}</p>
			</div>
		</div>
	)
}

export default Testimonial
