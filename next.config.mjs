/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        //protocol: 'https',
        hostname: "http://localhost",
        port: "3000",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "mazaltov-rsvp.co.il",
        //port: "",
        pathname: "/images/**",
      },
      {
        //protocol: 'https',
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        //protocol: 'https',
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
