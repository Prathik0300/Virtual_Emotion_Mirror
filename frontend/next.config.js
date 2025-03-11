const nextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ["m.media-amazon.com", "i.scdn.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
    ],
  },
};

export default nextConfig;
