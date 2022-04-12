import { render } from '@testing-library/react';

import DynamicPage from '../pages/[[...slug]]';

const site = {
  __metadata: {
    id: 'content/data/config.json',
    source: 'sourcebit-source-filesystem',
    sourceName: 'data',
    sourcePath: '/home/amiller/projects/molecular/content/data',
    relSourcePath: 'config.json',
    relProjectPath: 'content/data/config.json',
    modelType: 'data',
    modelName: 'SiteConfig',
    modelLabel: 'Site Config'
  },
  type: 'SiteConfig',
  title: 'Stackbit',
  footer: {
    type: 'FooterConfig',
    copyright: 'Made by [Stackbit](https://www.stackbit.com/)\n',
    __metadata: {
      modelType: 'object',
      modelName: 'FooterConfig',
      modelLabel: 'Footer Config'
    }
  }
};

const page = {
  __metadata: {
    id: 'content/pages/index.md',
    source: 'sourcebit-source-filesystem',
    sourceName: 'pages',
    sourcePath: '/home/amiller/projects/molecular/content/pages',
    relSourcePath: 'index.md',
    relProjectPath: 'content/pages/index.md',
    modelType: 'page',
    modelName: 'Page',
    modelLabel: 'Page',
    urlPath: '/'
  },
  layout: 'Page',
  title: 'Stackbit Next.js Starter',
  sections: [
    {
      heading: 'Welcome to Stackbit!',
      type: 'HeroSection',
      subheading:
        "You've just [unlocked visual editing capabilities](https://www.stackbit.com/) in this Next.js app.\n",
      actions: [
        {
          label: 'Start Building',
          type: 'Button',
          url: 'https://docs.stackbit.com/getting-started/',
          theme: 'primary'
        },
        {
          label: 'Read the Docs',
          type: 'Button',
          url: 'https://docs.stackbit.com/',
          theme: 'secondary'
        }
      ]
    },
    {
      type: 'CardGridSection',
      heading: 'Jump to Topic',
      subheading: 'Or jump right to a specific topic to help you build your site.\n',
      items: [
        {
          type: 'Card',
          heading: 'How Stackbit Works →',
          subheading: 'Follow an end-to-end guide to learn the inner-workings of Stackbit.\n',
          url: 'https://docs.stackbit.com/conceptual-guides/how-stackbit-works/'
        },
        {
          type: 'Card',
          heading: 'Pages →',
          subheading:
            'Add a new type of page to your site, while touching on content modeling and data retrieval.\n',
          url: 'https://docs.stackbit.com/how-to-guides/content/'
        },
        {
          type: 'Card',
          heading: 'Components →',
          subheading:
            'Make components editable, add styles, and provide content presets to speed up content editing.\n',
          url: 'https://docs.stackbit.com/how-to-guides/components/'
        },
        {
          type: 'Card',
          heading: 'Styling →',
          subheading:
            'Set up global styles and add a styling toolbar to individual components in the visual editor.\n',
          url: 'https://docs.stackbit.com/how-to-guides/styles/'
        }
      ]
    }
  ],
  content: null
};

describe('Card', () => {
  it('should render successfully', () => {
    const { container } = render(<DynamicPage site={site} page={page} />);
    expect(container).toBeInstanceOf(HTMLElement);
    expect(container).toMatchSnapshot();
  });
});
