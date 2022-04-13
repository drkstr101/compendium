import {
  formatFiles,
  getProjects,
  installPackagesTask,
  ProjectConfiguration,
  Tree,
  visitNotIgnoredFiles
} from '@nrwl/devkit';
import { readFileSync, writeFileSync } from 'fs';
import { basename, extname } from 'path';

const HEADER = `Copyright ${new Date().getFullYear()} Watheia Labs, LLC. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.`;

const JS_COMMENT_STYLE = {
  start: '/*\n * ',
  middle: ' * ',
  end: '\n */\n'
};

const HTML_COMMENT_STYLE = {
  start: '<!-- ',
  middle: '',
  end: ' -->\n'
};

const COMMENT_STYLES = {
  '.js': JS_COMMENT_STYLE,
  '.ts': JS_COMMENT_STYLE,
  '.tsx': JS_COMMENT_STYLE,
  '.css': JS_COMMENT_STYLE
};

const excludes = ['sw.js'];

export default async function (tree: Tree, schema: any) {
  getProjects(tree).forEach(projectVisitor(tree));
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}

function projectVisitor(tree: Tree) {
  return (project: ProjectConfiguration) => {
    visitNotIgnoredFiles(tree, project.sourceRoot, (filePath: string) => {
      const style = COMMENT_STYLES[extname(filePath)];
      if (style && !excludes.includes(basename(filePath))) {
        let contents = readFileSync(filePath, 'utf8');
        let header = style.start + HEADER.split('\n').join('\n' + style.middle) + style.end;
        header = header.replace(/\s+\n/g, '\n');
        if (!/Copyright \d+ Watheia Labs, LLC/.test(contents)) {
          contents = header + '\n' + contents;
          writeFileSync(filePath, contents);
        }
      }
    });
  };
}
