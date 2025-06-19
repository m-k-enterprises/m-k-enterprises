'use client';
import React, { useEffect, useState } from 'react';

interface NumberCounterProps {
  /** Starting value */
  start: number;
  /** Ending value */
  end: number;
  /** Animation duration in ms */
  duration: number;
}

/**
 * Animates a number from `start` to `end`.
 *
 * Falls back to the `end` value when `duration` is `0`.
 */
export default function NumberCounter({ start, end, duration }: NumberCounterProps) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    const distance = end - start;
    if (distance === 0 || duration <= 0) {
      setValue(end);
      return;
    }

    const step = distance > 0 ? 1 : -1;
    const interval = window.setInterval(() => {
      setValue(prev => {
        const next = prev + step;
        if ((step > 0 && next >= end) || (step < 0 && next <= end)) {
          clearInterval(interval);
          return end;
        }
        return next;
      });
    }, Math.abs(duration / distance));

    return () => clearInterval(interval);
  }, [start, end, duration]);

  return <>{value}</>;
}
