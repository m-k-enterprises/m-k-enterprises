import React from 'react';

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
