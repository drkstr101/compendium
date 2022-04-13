const docStringTerminal = '```';

export const renderDocs = (name: string) => `
---
labels: ['react', 'spectrum', 'theme', 'styles', '${name}']
description: 'Spectrum CSS Module: ${name}'
---

import styles from './index.module.css';
import CSSModulePreview from '@compendium/dev.docs.css-module-preview';

A small wrapper around spectrum-css, allowing the global
styles to be imported as css modules rather than global CSS.

<CSSModulePreview styles={styles} />;
`;

export const renderSpecs = (name: string) => `
import { expect } from 'chai';
import styles from '.';

describe('compendium.theme/styles/${name}', () => {
  it('SHOULD export styles as CSSModule', () => {
    expect(styles).to.be.an('object');
  });
});
`;
