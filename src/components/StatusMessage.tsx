import { random } from 'lodash';
import React from 'react';
import { Alert, Button, Placeholder } from 'react-bootstrap';

export type StatusState = 'loading' | 'error' | 'empty';

interface StatusMessageProps {
  state: StatusState;
  message: string;
  onRetry?: () => Promise<void> | void;
}

function StatusMessage({ state, message, onRetry }: StatusMessageProps) {
  const variant = state === 'error' ? 'danger' : state === 'loading' ? 'info' : 'secondary';

  return (
    <Alert
      variant={variant}
      role={state === 'loading' ? 'status' : undefined}
      aria-live={state === 'loading' ? 'polite' : undefined}
    >
      {state === 'loading' ? (
        <>
          <Placeholder as={Alert.Heading} animation="glow">
            <Placeholder xs={random(2, 6)} />
          </Placeholder>
          <span className="visually-hidden">{message}</span>
        </>
      ) : (
        <Alert.Heading>{message}</Alert.Heading>
      )}
      {state === 'error' && onRetry ? (
        <>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant={variant} onClick={onRetry} size="sm">
              Retry
            </Button>
          </div>
        </>
      ) : null}
    </Alert>
  );
}

export default StatusMessage;
