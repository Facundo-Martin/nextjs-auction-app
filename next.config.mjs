/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "pub-6e66d7b5eec84b4189a8ca7e50287a49.r2.dev",
        port: "",
      },
    ],
  },
};

export default nextConfig;
