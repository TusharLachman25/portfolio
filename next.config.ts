import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* One canonical host. Both www and the apex resolve at the DNS level, so
   * without this the whole site answers on two hostnames — every page reachable
   * at two URLs, which splits crawl budget and makes any link a coin flip
   * between them. The metadata already declares the apex canonical (SITE_URL in
   * src/data/site.ts); this makes the server agree rather than leaving it to
   * search engines to work out from a <link rel="canonical"> alone.
   *
   * Written here rather than set on the Vercel domain so it is version
   * controlled and survives the project being recreated or moved. */
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.tusharlachman.dev' }],
        destination: 'https://tusharlachman.dev/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
