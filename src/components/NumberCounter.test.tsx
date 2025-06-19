import React from 'react';
import { render, screen } from '@testing-library/react';

import NumberCounter from './NumberCounter';

test('shows the end value immediately when duration is zero', () => {
  render(<NumberCounter start={0} end={5} duration={0} />);
  expect(screen.getByText('5')).toBeInTheDocument();
});
