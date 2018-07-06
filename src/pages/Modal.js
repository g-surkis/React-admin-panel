// @flow

import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
// import './Modal.css';

const actionsContainerStyle = {
  padding: '0 24px 24px'
};

//до уваги не бери, я хотів попробувати як в тихфайлах що ти надіслав, але там треба з material-ui розбиратися
export default class Modal extends React.Component {
  render() {
    const actions = [
      <Button
        label={this.props.cancelLabel}
        className="cancel-button"
        onClick={this.props.onCancel}
      />,
      <Button
        label={this.props.submitLabel}
        className="submit-button"
        primary={true}
        onClick={this.props.onSubmit}
      />
    ];
    return (
      <div id={this.props.id}>
        <Dialog
          title={this.props.title}
          actions={actions}
          modal={true}
          open={this.props.open}
          paperClassName="dialog-container"
          actionsContainerClassName="actions-container"
          actionsContainerStyle={actionsContainerStyle}
        >
          {this.props.children}
        </Dialog>
      </div>
    );
  }
}
