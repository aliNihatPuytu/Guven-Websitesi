/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1440, 1920],
  },
  async redirects() {
    // Eski adresler → yeni makine grubu sayfaları (SEO geçişi)
    const legacy = {
      ekskavatorler: 'ekskavator-grubu',
      forkliftler: 'forklift-grubu',
      yukleyiciler: 'lastikli-yukleyici-grubu',
      'mini-ekskavatorler': 'mini-ekskavator-grubu',
      'istif-makineleri': 'forklift-grubu',
    };
    return [
      ...Object.entries(legacy).map(([from, to]) => ({
        source: `/makinalar/${from}`,
        destination: `/makineler/${to}`,
        permanent: true,
      })),
      { source: '/makinalar', destination: '/makineler', permanent: true },
      { source: '/makinalar/:path*', destination: '/makineler', permanent: true },
      { source: '/projeler', destination: '/referanslar', permanent: true },
      { source: '/projeler/:path*', destination: '/referanslar', permanent: true },
      { source: '/ekip', destination: '/hakkimizda', permanent: true },
      { source: '/ekip/:path*', destination: '/hakkimizda', permanent: true },
    ];
  },
};

export default nextConfig;
=======
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
    ],
  },
};

export default nextConfig;
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
