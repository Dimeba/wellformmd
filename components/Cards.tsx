'use client'

// styles
import styles from './Cards.module.scss'

interface Props {
	slider?: true
	columns: 3 | 4
}

const Cards: React.FC<Props> = ({ slider, columns }) => {
	const scroll = (position: number): void => {
		const container = document.querySelector(`.${styles.slider}`)
		if (container) {
			container.scrollBy({ left: position, behavior: 'smooth' })
		}
	}

	const scrollPosition: number = 200

	const defaultStyles = {
		gridTemplateColumns: `repeat(${columns}, 1fr)`
	}

	const sliderStyles = {
		gridAutoColumns: `calc((100% - (2rem * (${columns - 1}))) / ${columns})`
	}

	return (
		<div className={styles.cardsContainer}>
			{slider && <button onClick={() => scroll(-scrollPosition)}>Left</button>}
			{slider && <button onClick={() => scroll(scrollPosition)}>Right</button>}
			<div
				className={`${slider ? styles.slider : styles.default}`}
				style={slider ? sliderStyles : defaultStyles}
			>
				<div>Test</div>
				<div>Test</div>
				<div>Test</div>
				<div>Test</div>
				<div>Test</div>
				<div>Test</div>
				<div>Test</div>
				<div>Test</div>
			</div>
		</div>
	)
}

export default Cards
