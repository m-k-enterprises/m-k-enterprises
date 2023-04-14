import React from 'react';
import { random } from 'lodash';

interface NumberCounterProps {
  number: number;
  start: number;
  end: number;
  duration: number;
}

function NumberCounter(props: NumberCounterProps) {
  return (
    <>{ props.number }</>
  );
}

export default NumberCounter;
