/**
 * Copyright 2022 Watheia Labs, LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Document, { Head, Html, Main, NextScript } from 'next/document';

/**
 * Set branding assets.
 * See: https://realfavicongenerator.net/
 */
export default class WaNextDocument extends Document {
  override render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0554f2" />
          <meta name="apple-mobile-web-app-title" content="Molecular Design" />
          <meta name="application-name" content="Molecular Design" />
          <meta name="msapplication-TileColor" content="#a0f2f2" />
          <meta name="theme-color" content="#a0f2f2" />

          {/* Set ld+json metadata */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'http://schema.org',
                '@type': 'Article',
                author: 'Watheia Labs, LLC',
                headline: 'Molecular Design',
                description: 'A monorepo Stackbit theme for the enterprise.',
                image: 'https://www.datocms-assets.com/64528/1649322075-molecular.jpg',
                publisher: {
                  '@type': 'Organization',
                  url: 'https://molecular.vercel.app',
                  name: 'Watheia',
                  logo: 'https://www.datocms-assets.com/64528/1649322075-molecular.jpg'
                }
              })
            }}
          />
        </Head>
        <body data-theme="business">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
