/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Abaikan semua error lint saat menjalankan `next build`
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
