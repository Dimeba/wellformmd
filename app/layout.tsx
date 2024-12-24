export const revalidate = 0

import type { Metadata } from 'next'
import './globals.scss'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
	icons: {
		icon: '/favicon.svg'
	},
	description: 'Weight Loss & Wellness',
	keywords: ['health', 'wellness', 'Iowa', 'nutrition', 'coaching']
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	)
}
