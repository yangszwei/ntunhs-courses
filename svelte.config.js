import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/components',
		},
		vite: {
			server: {
				hmr: { clientPort: 443 },
			},
		},
	},
};

export default config;
