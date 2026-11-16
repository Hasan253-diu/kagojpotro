/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Support loading local encrypted streams
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma', '@node-rs/argon2', 'archiver', 'adm-zip']
  }
};

export default nextConfig;
