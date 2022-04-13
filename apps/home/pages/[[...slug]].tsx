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

import { IPage, LayoutContext } from '@compendium/dev.types';
import { renderElement } from '@compendium/ui';
import { sourcebitDataClient, MolecularApi } from '@compendium/api';
import Markdown from 'markdown-to-jsx';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

const renderSection = (model, key) => renderElement(model, { key });

const DynamicPage = (props: LayoutContext) => {
  const { page, site } = props;
  return (
    <div className="page-container">
      <Head>
        <title>{page.title}</title>
      </Head>

      <div data-sb-object-id={page.__metadata.id}>
        {page.sections && page.sections.map(renderSection)}
        {page.content && <Markdown data-sb-field-path=".content">{page.content}</Markdown>}
      </div>

      <div className="page-footer">
        <div className="footer-container" data-sb-field-path="content/data/config.json:footer">
          <div data-sb-field-path=".copyright" className="footer-content">
            <Markdown>{site.footer.copyright}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // instantiate api from current data cache
  const api = new MolecularApi(await sourcebitDataClient.getData());

  // build the current path from slug params
  const urlPath = params.slug
    ? typeof params.slug === 'string'
      ? params['slug']
      : '/' + params['slug'].join('/')
    : '/';

  // grab the global site context model
  const site = api.getProps()['site'] ?? null;

  // find the page model matching the computed urlPath
  const page = api.getPages().find((it: IPage) => it.__metadata['urlPath'] === urlPath) ?? null;

  // bag it all up and send it over the wire as JSON data
  return { props: { urlPath, page, site } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const api = new MolecularApi(await sourcebitDataClient.getData());
  const paths = api.getPages().map((it) => it.__metadata['urlPath'] as string);
  return { paths, fallback: false };
};

export default DynamicPage;
