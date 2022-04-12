import { render } from '@testing-library/react';

import ExpoView from './expo-view';

describe('ExpoView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExpoView />);
    expect(baseElement).toBeTruthy();
  });
});
