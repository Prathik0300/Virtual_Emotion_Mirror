/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["m.media-amazon.com", "i.scdn.co"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
