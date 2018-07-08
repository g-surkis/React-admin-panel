import React from 'react';
import { Modal, Image } from 'react-bootstrap';

import close from '../../img/close.png';

export function showAlert(message, bsStyle, dismiss) {
  setTimeout(() => {
    dismiss();
  }, 3000);
  return (
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
