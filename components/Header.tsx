'use client'

//styles
import styles from './Header.module.scss'

//hooks
import { useState, useEffect } from 'react'

//navigation
import { usePathname } from 'next/navigation'

//icons, images, link
import Link from 'next/link'
import Image from 'next/image'
import { FaChevronDown } from 'react-icons/fa'
import 'font-awesome/css/font-awesome.min.css'

//components
import Button from './Button'
import HamburgerMenu from './Hamburger'

//types
import { Treatment } from '@/types/contentTypes'

//slug
const createSlug = (title: string): string => {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9 ]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
}

// queries
import { getTreatments } from '@/graphql/queries'

interface MenuItem {
	title: string
	href: string
	submenuTitle?: string
	submenu?: { title: string; href: string }[]
}

const menuItems: MenuItem[] = [
	{
		title: 'Treatments',
		href: '/treatments',
		submenuTitle: 'Treatments',
		submenu: [
			{
				title: 'Anti Aging Treatment',
				href: '/treatments/anti-aging-treatment'
			},
			{
				title: 'InBody 970 Body Composition Analyzer',
				href: '/treatments/inbody-970-body-composition-analyzer'
			},
			{
				title: 'UltraSmooth®Cellulite',
				href: '/treatments/ultrasmoothcellulite'
			},
			{
				title: 'UltraSlim® Fat & Weight Loss',
				href: '/treatments/ultraslim-fat-weight-loss'
			},
			{
				title: 'Physician-led Weight Loss Program',
				href: '/treatments/physicianled-weight-loss-program'
			},
			{
				title: 'Body Contouring',
				href: '/treatments/body-contouring'
			},
			{
				title: 'Mommy Makeover',
				href: '/treatments/mommy-makeover'
			},
			{
				title: 'Waist Buster',
				href: '/treatments/waist-buster'
			}
		]
	},
	{ title: 'Specials', href: '/specials' },
	{ title: 'Gallery', href: '/gallery' },
	{ title: 'About Us', href: '/about' },
	{ title: 'Blog', href: '/blog' }
]

const Header: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isScrolled, setIsScrolled] = useState<boolean>(false) //state for scrolled header
	const [activeSubmenu, setActiveSubmenu] = useState<number | false>(false) //state for submenu
	const pathname = usePathname()
	const isHomepage = pathname == '/'
	const [treatments, setTreatments] = useState<Treatment[]>([])

	useEffect(() => {
		getTreatments().then(setTreatments)
	}, [])

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}
	//changing ui for header on scroll
	const handleScroll = (): void => {
		setIsScrolled(window.scrollY > 50)
	}

	useEffect(() => {
		window.scrollTo(0, 0)
		window.addEventListener('scroll', handleScroll)
		handleScroll()
		return () => window.removeEventListener('scroll', handleScroll)
	}, [pathname])

	const toggleSubmenu = (index: number): void => {
		setActiveSubmenu(activeSubmenu == index ? false : index)
	}
	const handleMouseEnter = () => {
		document.querySelector(`.${styles.header}`)?.classList.add(styles.hovered)
	}

	const handleMouseLeave = () => {
		document
			.querySelector(`.${styles.header}`)
			?.classList.remove(styles.hovered)
	}

	return (
		<div className={styles.headerWrapper}>
			<header
				className={`${styles.header} ${
					isScrolled || !isHomepage ? styles.scrolled : ''
				}`}
			>
				<p className={styles.welcomeMessage}>
					<i className='fa-solid fa-phone-volume' />
					(515) 446-8304
				</p>
				<div className={`container ${styles.headerContainer}`}>
					<Link href='/' className={styles.logoWrapper} aria-label='Homepage'>
						<Image
							src='/logo.png'
							width={280}
							height={70}
							alt='Weight loss and wellness'
							className={styles.logo}
							priority
						/>
					</Link>
					<nav className={`${styles.navigation} ${isOpen ? styles.open : ''}`}>
						<ul className={styles.menuList}>
							{menuItems.map((item, index) => (
								<li
									key={index}
									className={styles.menuItemContainer}
									onMouseEnter={item.submenu ? handleMouseEnter : undefined}
									onMouseLeave={item.submenu ? handleMouseLeave : undefined}
								>
									<Link
										href={item.href}
										className={styles.menuItem}
										onClick={() =>
											item.submenu
												? toggleSubmenu(index)
												: setActiveSubmenu(false)
										}
									>
										<div
											style={{
												display: 'flex'
											}}
										>
											{item.title}
											{item.title == 'Treatments' && (
												<FaChevronDown
													style={{
														marginLeft: '0.2rem'
													}}
												/>
											)}
										</div>
									</Link>
									{item.submenu && (
										<div
											className={`container ${styles.dropdown} ${
												activeSubmenu == index ? styles.open : ''
											}`}
										>
											<div className={`container ${styles.dropdownContainer}`}>
												{item.submenuTitle && (
													<div className={styles.submenuTitle}>
														<h3>{item.submenuTitle}</h3>
														<div className={styles.dropdownContent}>
															{treatments.map(item => (
																<Link
																	key={item.node.id}
																	href={`/treatments/${item.node.title
																		.toLowerCase()
																		.replace(/[^a-z0-9 ]/g, '')
																		.replace(/ /g, '-')
																		.replace(/-+/g, '-')}`}
																	className={styles.dropdownLink}
																	onClick={() => setActiveSubmenu(false)}
																>
																	{item.node.title}
																</Link>
															))}
														</div>
													</div>
												)}
												<div className={styles.dropdownImageWrapper}>
													<Image
														src='/dropdown.jpg'
														alt='submenu example img'
														width={600}
														height={400}
													/>
												</div>
											</div>
										</div>
									)}
								</li>
							))}{' '}
						</ul>
						<div className={styles.mobileBtn}>
							<Button
								text='Book Consultation'
								link='/book-now'
								secondary={false}
							/>
						</div>
					</nav>{' '}
					<HamburgerMenu toggled={isOpen} toggle={toggleMenu} />
				</div>
			</header>
		</div>
	)
}

export default Header
