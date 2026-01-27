import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
	base: '/verbalgame',
	plugins: [vue()],
	optimizeDeps: {
		exclude: ['express'], // Exclude express explicitly
	},
});
