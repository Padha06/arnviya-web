/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  // The repo root also has a package-lock.json, so pin the tracing root here.
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
