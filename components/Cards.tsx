'use client'

//components
import Button from '../components/Button'
import Card from './Card'

// styles
import styles from './Cards.module.scss'

// hooks
import { useState, useEffect } from 'react'

// types
import {
	Treatment,
	Benefit,
	Testimonial,
	Article,
	TeamMember
} from '@/types/contentTypes'

interface Props {
	slider?: true
	columns: 3 | 4
	content: Treatment[] | Benefit[] | Testimonial[] | Article[] | TeamMember[]
}

const Cards: React.FC<Props> = ({ slider, columns, content }) => {
	const [windowWidth, setWindowWidth] = useState<number>(0)

	// Calculate window width on window resize
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth)
		}

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	// Scroll function
	const scroll = (forward: boolean): void => {
		const container = document.querySelector(`.${styles.slider}`)
		if (container) {
			const containerWidth = container.clientWidth

			// Calculate gap between columns based on rem
			const gap =
				parseFloat(getComputedStyle(document.documentElement).fontSize) * 2

			// Calculate column width based on window width
			let newColumnWidth: number
			switch (true) {
				case windowWidth < 768:
					newColumnWidth = containerWidth
					break
				case windowWidth < 1024:
					newColumnWidth = (containerWidth - gap) / 2
					break
				default:
					newColumnWidth = (containerWidth - gap * (columns - 1)) / columns
			}

			container.scrollBy({
				left: forward ? newColumnWidth : -newColumnWidth,
				behavior: 'smooth'
			})
		}
	}

	const defaultStyles = {
		gridTemplateColumns: `repeat(${columns}, 1fr)`
	}

	const sliderStyles = {
		gridAutoColumns: `calc((100% - (2rem * (${columns - 1}))) / ${columns})`
	}

	return (
		<div className={styles.cardsContainer}>
			{slider && <button onClick={() => scroll(false)}>Left</button>}
			{slider && <button onClick={() => scroll(true)}>Right</button>}
			<div
				className={`${slider ? styles.slider : styles.default}`}
				style={slider ? sliderStyles : defaultStyles}
			>
				{content.map(item => {
					//treatment fields
					if ('treatmentFields' in item.node) {
						return (
							<Card
								key={item.node.id}
								title={item.node.title}
								subtitle={item.node.treatmentFields.subtitle}
								image={item.node.treatmentFields.image.node.link}
								underline
								button
							/>
						)
					}

					// benefit fie
					if ('benefitFields' in item.node) {
						return (
							<Card
								key={item.node.id}
								title={item.node.title}
								subtitle={item.node.benefitFields.subtitle}
								image={item.node.benefitFields.image.node.link}
								smallImage
							/>
						)
					}

					return null
				})}
			</div>
		</div>
	)
}

export default Cards
