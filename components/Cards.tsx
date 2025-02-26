'use client'

//components
import Card from './Card'
import TestimonialCard from './Testimonial'
import SpecialCard from './SpecialCard'
import TeamMemberCard from './TeamMemberCard'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'

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
	TeamMember,
	Special,
	Image
} from '@/types/contentTypes'

interface Props {
	slider?: true
	columns: 1 | 2 | 3 | 4
	content:
		| Treatment[]
		| Benefit[]
		| Testimonial[]
		| Article[]
		| TeamMember[]
		| Special[]
		| Image[]
	cardsFlex?: true
	fullWidth?: true
}

const Cards: React.FC<Props> = ({
	slider,
	columns,
	content,
	cardsFlex,
	fullWidth
}) => {
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
			{slider && (
				<button
					onClick={() => scroll(false)}
					style={{ left: fullWidth ? 32 : 0 }}
					name='scroll left'
				>
					<IoIosArrowBack size={20} fill='white' />
				</button>
			)}
			{slider && (
				<button
					onClick={() => scroll(true)}
					style={{ right: fullWidth ? 32 : 0 }}
					name='scroll right'
				>
					<IoIosArrowForward size={20} fill='white' />
				</button>
			)}
			<div
				className={`${
					cardsFlex && !slider
						? styles.flex
						: slider
						? styles.slider
						: styles.default
				}`}
				style={slider ? sliderStyles : defaultStyles}
			>
				{content.map((item, index) => {
					switch (true) {
						case 'treatmentFields' in item.node:
							return (
								<Card
									key={item.node.id}
									title={item.node.title}
									subtitle={item.node.treatmentFields.subtitle}
									image={item.node.treatmentFields.image.node.link}
									underline
									buttonText='View Treatment'
									folder='treatments'
								/>
							)
						case 'benefitFields' in item.node:
							return (
								<Card
									key={item.node.id}
									title={item.node.title}
									subtitle={item.node.benefitFields.subtitle}
									image={item.node.benefitFields.image.node.link}
									smallImage
								/>
							)
						case 'articleFields' in item.node:
							return (
								<Card
									key={item.node.id}
									title={item.node.title}
									image={item.node.articleFields.image.node.link}
									rectangle
									underline
									buttonText='Read Article'
									folder='blog'
								/>
							)
						case 'testimonialFields' in item.node:
							return (
								<TestimonialCard
									key={item.node.id}
									text={item.node.testimonialFields.text}
									name={item.node.title}
									image={item.node.testimonialFields.image.node.link}
								/>
							)
						case 'specialFields' in item.node:
							return (
								<SpecialCard
									key={item.node.id}
									title={item.node.title}
									subtitle={item.node.specialFields.subtitle}
									text={item.node.specialFields.text}
									image={item.node.specialFields.image.node.link}
									button={{
										text: 'Buy Gift Card',
										link: item.node.specialFields.link
									}}
									index={index}
								/>
							)

						case 'teamMemberFields' in item.node:
							return (
								<TeamMemberCard
									key={item.node.id}
									title={item.node.title}
									bio={item.node.teamMemberFields.bio}
									image={item.node.teamMemberFields.image.node.link}
								/>
							)
						case 'imageFields' in item.node:
							return (
								<Card
									key={item.node.id}
									title={item.node.id}
									image={item.node.link}
									rectangle
									hideText
								/>
							)
						default:
							return null
					}
				})}
			</div>
		</div>
	)
}

export default Cards
