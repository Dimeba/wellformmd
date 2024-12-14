import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	env: {
		wordpress: process.env.NEXT_PUBLIC_WORDPRESS_API_URL
	}
}

export default nextConfig
