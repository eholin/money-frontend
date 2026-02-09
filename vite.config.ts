import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {fileURLToPath, URL} from 'node:url';

export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            '/api': {
                target: 'http://money.test',
                changeOrigin: true,
                secure: false,
            },
        },
        host: '0.0.0.0',
        port: 5173,
        hmr: {
            host: '192.168.1.111'
        },
        watch: {
            usePolling: true,
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});