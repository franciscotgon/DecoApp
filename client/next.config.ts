/** @type {import('next').NextConfig} */
const nextConfig = {
  // Buena práctica para detectar problemas potenciales en desarrollo
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },

  // Elimina cualquier propiedad 'experimental' a menos que sea estrictamente necesario.
};

module.exports = nextConfig;
