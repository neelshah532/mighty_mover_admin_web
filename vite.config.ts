// import { defineConfig, } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [react()],
//     root: 'src',
//     server: {
//         port: 5174,
//     },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    return {
        plugins: [react()],

        server: {
            port: parseInt(env.VITE_PORT),
        },
    };
});
