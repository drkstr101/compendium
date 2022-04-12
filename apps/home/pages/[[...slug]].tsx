import { IPage, LayoutContext } from '@watheia/molecular.types';
import { renderElement } from '@watheia/molecular.ui';
import { sourcebitDataClient, MolecularApi } from '@watheia/molecular.api';
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
