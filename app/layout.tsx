import type { Metadata } from 'next'
import './globals.scss'

export const metadata: Metadata = {
	title: 'Wellform MD',
	description: 'Weight loss and wellness'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	)
}
