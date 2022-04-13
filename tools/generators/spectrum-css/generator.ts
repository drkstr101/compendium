import {
  Tree,
  formatFiles,
  installPackagesTask,
  readProjectConfiguration,
  visitNotIgnoredFiles
} from '@nrwl/devkit';
// import { tsquery } from '@phenomnomnominal/tsquery';
import { extname, basename, dirname, normalize } from 'path';
import { renderDocs, renderSpecs } from './template';

function pathInfo(path: string) {
  return [dirname(path), basename(path)];
}

export default async function spectrumCssGenerator(tree: Tree, schema: { name: string }) {
  const sourceRoot = readProjectConfiguration(tree, schema.name).sourceRoot;
  visitNotIgnoredFiles(tree, sourceRoot, (filePath) => {
    // Find all dirs that contain a css module
    if (filePath.endsWith('index.module.css')) {
      const [base, name] = pathInfo(dirname(filePath));
      console.log('Generating:', name);

      const docsFile = `${base}/${name}/${name}.docs.mdx`;
      tree.write(docsFile, renderDocs(name));

      const specsFile = `${base}/${name}/${name}.spec.tsx`;
      tree.write(specsFile, renderSpecs(name));
    }
  });

  return () => {
    installPackagesTask(tree);
  };
}
