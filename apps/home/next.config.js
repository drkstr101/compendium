const analyzer = require('@next/bundle-analyzer');
const sourcebit = require('sourcebit');
const withNx = require('@nrwl/next/plugins/with-nx');
const withPreact = require('next-plugin-preact');
const withPWA = require('next-pwa');

const withBundleAnalyzer = analyzer({
  enabled: process.env['ANALYZE'] === 'true'
});

const sourcebitConfig = require('../../sourcebit.js');
const withSourcebit = sourcebit.sourcebitNext({ config: sourcebitConfig });

/**
 * @type {WithNxOptions}
 **/
const nextConfig = {
  // Prefer loading of ES Modules over CommonJS
  experimental: {
    // concurrentFeatures: true,
    esmExternals: true
  },
  // minify output
  swcMinify: true,
  // webpack,
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false
  },
  // env: { WA_HOME_URL, WA_EXPO_URL, WA_CONTACT_URL },
  images: {
    domains: [
      'images.unsplash.com',
      'localhost' // For Strapi
    ],
    imageSizes: [24, 64, 128]
  },
  pwa: {
    disable: process.env['NODE_ENV'] === 'development',
    sw: `sw.js`,
    cacheOnFrontEndNav: true // warning: may cause additional network request
  }
};

module.exports = withNx(withBundleAnalyzer(withPreact(withPWA(withSourcebit(nextConfig)))));
