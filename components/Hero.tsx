// styles
import styles from './Hero.module.scss'

interface Props {
	title: string
}

const Hero: React.FC<Props> = ({ title }) => {
	return (
		<section className={styles.hero}>
			<div className='container'>
				<h1>{title}</h1>
			</div>
		</section>
	)
}

export default Hero
