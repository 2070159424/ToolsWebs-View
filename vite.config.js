import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			imports: ['vue', 'vue-router'],
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		}),
		ElementPlus()
	],
	// //仅开发环境测试使用
	// server: {
	// 	proxy: {
	// 		'/api': {
	// 			target: 'http://localhost:8080',
	// 			changeOrigin: true,
	// 			rewrite: path => path.replace(/\/api/, '')
	// 		}
	// 	}
	// }
})
