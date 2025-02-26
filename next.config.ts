import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	env: {
		wordpress: process.env.NEXT_PUBLIC_WORDPRESS_API_URL
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'wellform1stg.wpenginepowered.com',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'wellformmd.com',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'wellform.wpengine.com',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'wellform.wpenginepowered.com',
				pathname: '**'
			}
		],
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 768, 1024, 1280, 1600]
	},
	sassOptions: {
		quietDeps: true
	}
}

export default nextConfig
