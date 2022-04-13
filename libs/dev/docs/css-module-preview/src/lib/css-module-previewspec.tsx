import { render } from '@testing-library/react';

import DevDocsCssModulePreview from './dev-docs-css-module-preview';

describe('DevDocsCssModulePreview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DevDocsCssModulePreview />);
    expect(baseElement).toBeTruthy();
  });
});
