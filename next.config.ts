import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Keep the exported static site in `build/` so the existing GitHub Pages flow
  // can publish the generated output directly.
  distDir: 'build',
  output: 'export',
  trailingSlash: true,
};

export default nextConfig;
