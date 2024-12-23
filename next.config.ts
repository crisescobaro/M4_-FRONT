/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "www.apple.com",
      "support.apple.com",
      "i5.walmartimages.com",
      "th.bing.com",
      "i.imgur.com",
      "www.bhphotovideo.com",
    ],
  },
  typescript: {
    // Ignora los errores de compilación de TypeScript durante la construcción
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;



