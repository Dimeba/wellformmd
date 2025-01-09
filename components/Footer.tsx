import styles from './Footer.module.scss'
import Link from 'next/link'
import '@fortawesome/fontawesome-free/css/all.min.css'

const footerLinks = [
	{ href: '/about-us', text: 'About us' },
	{ href: '/about-us', text: 'Our Team' },
	{ href: '/services', text: 'Services' },
	{ href: '/before-after', text: 'Before & After Gallery' },
	{ href: '/specials', text: 'Specials' },
	{ href: '/reviews', text: 'Reviews' },
	{ href: '/blog', text: 'Blog' },
	{ href: '/contact', text: 'Contact' },
	{ href: '/book-consultation', text: 'Book Consultation' },
	{ href: '/anti-aging-treatment', text: 'Anti-aging treatment' },
	{ href: '/body-contouring', text: 'Body Contouring' },
	{ href: '/inbody-970', text: 'InBody 970 Body Composition Analyzer' },
	{ href: '/mommy-makeover', text: 'Mommy Makeover' },
	{ href: '/weight-loss', text: 'Weight Loss Program' },
	{ href: '/ultraslim', text: 'UltraSlim® Fat & Weight Loss' },
	{ href: '/ultrasmooth', text: 'UltraSmooth® Cellulite' },
	{ href: '/waist-buster', text: 'Waist Buster' },
	{ href: '/all-treatments', text: 'All Treatments →' }
]

const Footer: React.FC = () => {
	const footerLinkGroups = [
		footerLinks.slice(0, 5),
		footerLinks.slice(5, 9),
		footerLinks.slice(9, 14),
		footerLinks.slice(14, 18)
	]
	return (
		<footer className={styles.footer}>
			<div className={`container ${styles.footerContent}`}>
				{footerLinkGroups.map((linkGroup, groupIndex) => (
					<div key={groupIndex} className={styles.footerColumns}>
						{linkGroup.map((link, index) => (
							<Link key={index} href={link.href} className={styles.menuItem}>
								{link.text}
							</Link>
						))}
					</div>
				))}
			</div>

			<div className={`container ${styles.footerBottom}`}>
				<div className={styles.bottomInfo}>
					<p>
						<i className='fa-regular fa-clock' />
						Mon - Fri: 9am - 5pm | Sat: 9am - 12pm | Sun: closed
					</p>
					<p>
						<i className='fa-solid fa-location-dot' />
						2675 N Ankeny Blvd, #113, Ankeny, IA 50023
					</p>
					<p>
						{' '}
						<i className='fa-solid fa-phone-volume' />
						Call (515) 446-8304
					</p>
				</div>
				<div className={styles.socialLinks}>
					<a
						href='https://www.facebook.com/profile.php?id=61568324285945'
						className={styles.socialLink}
					>
						<i className='fab fa-facebook-f'></i>
					</a>
					{/* <a href='#' className={styles.socialLink}>
						<i className='fab fa-instagram'></i>
					</a> */}
					{/* <a href='#' className={styles.socialLink}>
						<i className='fab fa-tiktok'></i>
					</a> */}
					<a
						href='https://www.youtube.com/@WellFormMD'
						className={styles.socialLink}
					>
						<i className='fab fa-youtube'></i>
					</a>
				</div>
			</div>
			<div className={styles.copyright}>
				<p>
					&copy; 2024 Wellform MD - Weight Loss & Wellness. All rights reserved.
				</p>
			</div>
		</footer>
	)
}

export default Footer
