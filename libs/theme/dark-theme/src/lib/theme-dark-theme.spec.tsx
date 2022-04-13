import { render } from '@testing-library/react';

import ThemeDarkTheme from './theme-dark-theme';

describe('ThemeDarkTheme', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThemeDarkTheme />);
    expect(baseElement).toBeTruthy();
  });
});
