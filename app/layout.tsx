import type { Metadata } from 'next'
import './globals.scss'
import { Epilogue, Literata } from 'next/font/google'

const epilogue = Epilogue({
	subsets: ['latin']
})

const literata = Literata({
	subsets: ['latin']
})

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
	icons: {
		icon: '/favicon.svg'
	},
	description: 'Weight Loss & Wellness',
	keywords: ['health', 'wellness', 'Iowa', 'nutrition', 'coaching']
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${epilogue} ${literata}`}>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	)
}
