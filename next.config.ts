import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,  // 开启严格模式，帮助发现潜在的错误
  images: {
    domains: ['images.unsplash.com'],  // 允许加载 Unsplash 图片
  },
  env: {
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE || 'https://bioquest-backend.onrender.com', // API 网址
  },
};
export default nextConfig;
