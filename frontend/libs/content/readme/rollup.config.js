import nrwlConfig from '@nrwl/react/plugins/bundle-rollup';
import mdx from '@mdx-js/rollup';
export default (config) => {
  const nxConfig = nrwlConfig(config);
  return {
    ...nxConfig,
    plugins: [
      ...nxConfig.plugins,
      mdx({
        /* Options… */
      })
    ]
  };
};
