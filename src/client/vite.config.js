import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [vue(), tailwindcss()],

    build: {
        outDir: path.resolve(__dirname, '../../public/assets'),
        emptyOutDir: true,
        manifest: true,

        rollupOptions: {
            input: path.resolve(__dirname, 'src/main.js'),
            output: {
                entryFileNames: 'assets/app.js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name && assetInfo.name.endsWith('.css')) {
                        return 'assets/app.css';
                    }
                    return 'assets/[name][extname]';
                },
            },
        },
    },

    server: {
        port: 5173,
    },
});
