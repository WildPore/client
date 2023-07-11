import { defineConfig } from 'vite';
import postcssNesting from 'postcss-nesting';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		postcss: {
			plugins: [postcssNesting],
		},
	},

	plugins: [react()],
});
