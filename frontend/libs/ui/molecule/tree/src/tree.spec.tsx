import { render } from '@testing-library/react';

import { Tree, Item } from './tree';

describe('UiMoleculeTree', () => {
  it('should render successfully', () => {
    const { container } = render(
      <Tree>
        <Item>One</Item>
        <Item>Two</Item>
        <Item>Three</Item>
      </Tree>
    );
    expect(container).toBeInstanceOf(HTMLElement);
    expect(container).toMatchSnapshot();
  });
});
