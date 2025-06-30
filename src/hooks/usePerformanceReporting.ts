import { useEffect } from 'react';
import reportWebVitals from '../reportWebVitals';

/**
 * Registers web-vitals reporting to the console.
 */
export default function usePerformanceReporting(): void {
  useEffect(() => {
    reportWebVitals(metric => {
      // eslint-disable-next-line no-console
      console.log(metric);
    });
  }, []);
}
