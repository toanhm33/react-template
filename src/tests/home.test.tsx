import React from 'react';
import { wrapConfig } from 'utils/helper';
import HomePage from 'views/HomePage';

describe('<HomePage />', () => {
  it('renders without crashing', () => {
    const { getByText } = wrapConfig(<HomePage />);
    expect(getByText(/Students/)).toBeInTheDocument();
  });
});
