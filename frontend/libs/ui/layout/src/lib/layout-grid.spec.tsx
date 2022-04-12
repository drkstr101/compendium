import { render } from '@testing-library/react';

import LayoutGrid from './layout-grid';

describe('LayoutGrid', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LayoutGrid />);
    expect(baseElement).toBeTruthy();
  });
});
