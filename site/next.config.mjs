/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hostinger shared hosting serves static files only — no Node runtime.
  output: 'export',
  // Static hosts resolve /about to /about/index.html, so emit directories.
  trailingSlash: true,
  // next/image optimisation needs a server; export ships the originals.
  images: { unoptimized: true },
};
export default nextConfig;
