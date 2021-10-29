import { VitePWA } from "vite-plugin-pwa";

export default {
  build: {
    outDir: "docs",
  },
  plugins: [
    VitePWA({
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "애니인사이드",
        description: "분기마다 실시간으로 업데이트되는 요일별 애니메이션 목록",
        theme_color: "#17ba76",
        icons: [
          {
            src: "assets/pwa-192x192.c5f0750d.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "assets/pwa-512x512.695d0474.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "assets/pwa-512x512.695d0474.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
};
