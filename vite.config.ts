import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'
import * as path from "path";

const manifest = {
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    short_name: "Bio Calc",
    description: "A simple calculator for cows",
    name: "Bio Calc",
} as const;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(),
        VitePWA({
            workbox: {
                globPatterns: ["**/*"],
            },
            includeAssets: [
                "**/*",
            ],
            manifest
        })],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})


