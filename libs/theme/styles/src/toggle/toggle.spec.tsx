
import { expect } from 'chai';
import styles from '.';

describe('compendium.theme/styles/toggle', () => {
  it('SHOULD export styles as CSSModule', () => {
    expect(styles).to.be.an('object');
  });
});
