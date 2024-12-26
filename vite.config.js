import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),

    ],
    server: {
        host: '0.0.0.0', // Это позволит слушать на всех интерфейсах
        port: 5173, // Убедитесь, что порт совпадает с тем, который вы используете
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
})
