const path = require('path');
const { matchesProperty } = require('lodash');
// const { sourcebitDataClient } = require('sourcebit-target-next');

const isDev = process.env.NODE_ENV === 'development';

const sourcebitSourceFileSystem = {
  module: require('sourcebit-source-filesystem'),
  options: {
    watch: isDev,
    sources: [
      { name: 'data', path: path.join(__dirname, 'content/data') },
      { name: 'pages', path: path.join(__dirname, 'content/pages') }
    ]
  }
};

/**
 * converts { __metadata, frontmatter, markdown }
 * to { __metadata, ...frontmater, content: markdown }
 */
function flattenMarkdownData() {
  return ({ data }) => {
    const objects = data.objects.map((model) => {
      if ('frontmatter' in model) {
        return {
          __metadata: model.__metadata,
          ...model.frontmatter,
          content: model.markdown || null
        };
      }
      return model;
    });

    return {
      ...data,
      objects
    };
  };
}

const sourcebitTargetNext = {
  module: require('sourcebit-target-next'),
  options: {
    liveUpdate: isDev,
    flattenAssetUrls: true,
    // Define common props that will be provided to all pages
    commonProps: {
      site: {
        single: true,
        predicate: matchesProperty('__metadata.id', 'content/data/config.json')
      }
    },
    // Define which source objects represent pages
    // and under which paths they should be available.
    pages: [
      {
        path: '/{slug}',
        predicate: matchesProperty('__metadata.modelName', 'Page')
      }
    ]
  }
};

module.exports = {
  plugins: [sourcebitSourceFileSystem, flattenMarkdownData(), sourcebitTargetNext]
};
