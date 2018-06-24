import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';

export function showAlert(message, bsStyle, dismiss) {
  return (
    <Alert bsStyle={bsStyle} onDismiss={dismiss} className="alert">
      <h4>Success</h4>
      <p>{message}</p>
      <p>
        <span> </span>
        <Button onClick={dismiss}>Hide Alert</Button>
      </p>
    </Alert>
  );
}
