/*
 * Copyright 2022 Watheia Labs, LLC. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

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
