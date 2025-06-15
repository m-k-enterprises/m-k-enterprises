import React from 'react';
import { render, screen } from '@testing-library/react';

import NumberCounter from './NumberCounter';

test('displays the provided number', () => {
  render(<NumberCounter number={5} start={0} end={10} duration={0} />);
  expect(screen.getByText('5')).toBeInTheDocument();
});
