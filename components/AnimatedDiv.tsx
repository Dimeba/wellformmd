'use client'

// styles
import styles from './AnimatedDiv.module.scss'

// hooks
import { useRef, useState, useEffect } from 'react'

interface Props {
	children: React.ReactNode
	cssClass?: string | undefined
	style?: object | undefined
	animation?: 'left' | 'right' | undefined
}

const AnimatedDiv: React.FC<Props> = ({
	children,
	cssClass,
	style,
	animation
}) => {
	const ref = useRef<HTMLDivElement | null>(null)
	const [animationClass, setAnimationClass] = useState<string[]>([
		styles.up,
		styles.upAnimated
	])
	const [threshold, setThreshold] = useState<number>(0.1)

	useEffect(() => {
		const node = ref.current

		switch (animation) {
			case 'left':
				setAnimationClass([styles.left, styles.leftAnimated])
				setThreshold(0.5)
				break
			case 'right':
				setAnimationClass([styles.right, styles.rightAnimated])
				setThreshold(0.5)
				break
			default:
				setAnimationClass([styles.up, styles.upAnimated])
				break
		}

		if (node) {
			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						node.classList.add(animationClass[1])
						observer.unobserve(node) // Stop observing after animation starts
					}
				},
				{ threshold: threshold }
			)

			observer.observe(node)

			return () => {
				observer.disconnect()
			}
		}
	}, [])

	return (
		<div ref={ref} className={`${cssClass} ${animationClass[0]}`} style={style}>
			{children}
		</div>
	)
}

export default AnimatedDiv
