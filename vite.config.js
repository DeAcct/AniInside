import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default {
  build: {
    outDir: "docs",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    VitePWA({
      includeAssets: ["favicon.svg", "favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "애니인사이드",
        short_name: "애니인사이드",
        description: "분기마다 실시간으로 업데이트되는 요일별 애니메이션 목록",
        theme_color: "#17ba76",
        icons: [
          {
            src: "/public/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/public/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
};
