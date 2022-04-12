import { render } from '@testing-library/react';

import BlogView from './blog-view';

describe('BlogView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BlogView />);
    expect(baseElement).toBeTruthy();
  });
});
