import { render } from '@testing-library/react';

import CardGridSection from './card-grid-section';

describe('CardGridSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardGridSection />);
    expect(baseElement).toBeTruthy();
  });
});
