/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
	reactStrictMode: false,
	sassOptions: {
		includePath: [path.join(__dirname, 'styles')],
		prependData: `@import '@/styles/variables.scss';`
	},
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'i.ytimg.com' },
			{ protocol: 'https', hostname: 'images.unsplash.com' },
			{ protocol: 'https', hostname: 'plus.unsplash.com' },
			{ protocol: 'https', hostname: 'live.staticflickr.com' }
		]
	}
};

module.exports = nextConfig;
