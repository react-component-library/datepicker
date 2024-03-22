import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
    plugins: [react(), libInjectCss(), dts({ include: ['lib'] })],
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/index.ts'),
            formats: ['es'],
            name: '@react-component-library/datepicker',
            fileName: 'index',
        },
        copyPublicDir: false,
        sourcemap: true,
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            // output: {
            //     preserveModules: true,
            //     preserveModulesRoot: 'lib',
            //     entryFileNames: ({ name: fileName }) => {
            //         return `${fileName}.js`;
            //     },
            // },
        },
    },
});
