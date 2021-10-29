import { VitePWA } from "vite-plugin-pwa";

export default {
  build: {
    outDir: "docs",
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "한 눈에 보는 애니 편성표",
        short_name: "애니인사이드",
        description:
          "분기마다 실시간으로 업데이트되는 요일별 애니메이션 목록을 볼 수 있습니다",
        theme_color: "#17ba76",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
};
