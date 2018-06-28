import React, { Component } from 'react'; // Line 19:  'React' must be in scope when using JSX  react/react-in-jsx-scope
//така помилка якщо забрати
import { Modal, Image } from 'react-bootstrap';

import close from '../../img/close.png';

export function showAlert(message, bsStyle, dismiss) {
  setTimeout(() => {
    dismiss();
  }, 3000);
  return (
    // <Alert bsStyle={bsStyle} onDismiss={dismiss}>
    //   <h4>Success</h4>
    //   <p>{message}</p>
    //   <p>
    //     <span> </span>
    //     <Button onClick={dismiss}>Hide Alert</Button>
    //   </p>
    // </Alert>
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Success</Modal.Title>{' '}
        <Image src={close} thumbnail className="img_close" onClick={dismiss} />
      </Modal.Header>

      <Modal.Body>{message} </Modal.Body>

      <Modal.Footer />
    </Modal.Dialog>
  );
}
