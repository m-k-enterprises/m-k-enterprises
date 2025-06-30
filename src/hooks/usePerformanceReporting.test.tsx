import { render } from '@testing-library/react';
import React from 'react';
import usePerformanceReporting from './usePerformanceReporting';
import reportWebVitals from '../reportWebVitals';

jest.mock('../reportWebVitals');

describe('usePerformanceReporting', () => {
  function TestComponent() {
    usePerformanceReporting();
    return null;
  }

  it('calls reportWebVitals', () => {
    render(<TestComponent />);
    expect(reportWebVitals).toHaveBeenCalled();
  });
});
