/**
 * One codebase, two deploy targets.
 *
 * STATIC_EXPORT=true  → a pre-built static bundle for Hostinger shared
 *                       hosting, which has no Node runtime. Server features
 *                       are unavailable in this mode.
 * unset               → full Next.js for Vercel or any Node host: SSR,
 *                       Route Handlers, Server Actions, ISR, image
 *                       optimization and middleware all available.
 *
 * Nothing in app/ or components/ changes between the two.
 */
const isStatic = process.env.STATIC_EXPORT === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isStatic ? { output: 'export' } : {}),
  // Static hosts resolve /about to /about/index.html, so emit directories.
  trailingSlash: true,
  images: {
    // Optimisation needs a server; the export ships the originals instead.
    unoptimized: isStatic,
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
