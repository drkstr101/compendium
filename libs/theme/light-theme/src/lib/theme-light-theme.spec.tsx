import { render } from '@testing-library/react';

import ThemeLightTheme from './theme-light-theme';

describe('ThemeLightTheme', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThemeLightTheme />);
    expect(baseElement).toBeTruthy();
  });
});
