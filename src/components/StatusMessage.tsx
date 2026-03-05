import random from 'lodash/random';
import React from 'react';
import { Alert, Button, Placeholder } from 'react-bootstrap';

export type StatusState = 'loading' | 'error' | 'empty';

interface StatusMessageProps {
  state: StatusState;
  message: string;
  onRetry?: () => Promise<void> | void;
}

/**
 * Render a contextual status Alert for 'loading', 'error' or 'empty' states.
 *
 * Shows a loading placeholder with accessible text when `state` is 'loading', displays the provided `message` otherwise,
 * and, when `state` is 'error' and `onRetry` is supplied, renders a right-aligned "Retry" button that invokes `onRetry`.
 *
 * @param state - One of 'loading', 'error' or 'empty' indicating the current status
 * @param message - Text to display in the alert (also exposed to assistive technologies during loading)
 * @param onRetry - Optional callback invoked when the retry button is clicked; may return `void` or a `Promise<void>`
 * @returns A React element representing the status alert
 */
function StatusMessage({ state, message, onRetry }: StatusMessageProps) {
  const variant = state === 'error' ? 'danger' : state === 'loading' ? 'info' : 'secondary';
  const handleRetry = React.useCallback(() => {
    if (!onRetry) {
      return;
    }
    void Promise.resolve(onRetry()).catch(() => {
      // Errors are surfaced through state; avoid unhandled rejections here.
    });
  }, [onRetry]);

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
            <Button variant={variant} onClick={handleRetry} size="sm">
              Retry
            </Button>
          </div>
        </>
      ) : null}
    </Alert>
  );
}

export default StatusMessage;
