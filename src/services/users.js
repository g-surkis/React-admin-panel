import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';
const host = 'http://localhost:3001/users/';

export function updateUser(id, userData) {
  return fetch('http://localhost:3001/users/' + id, {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify(userData)
  });
  // .then(function(res) {
  //   alertMessage(res, 'User data deleted succefully!');
  // })
  // .catch(function(res) {
  //   alertMessage(res);
  // });
}

export function addUser(userData) {
  fetch(host, {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(userData)
  })
    .then(function(res) {
      alertMessage(res, 'User was created!');
    })
    .catch(function(res) {
      alertMessage(res);
    });
}

export function deleteUser(id) {
  fetch(host + id, {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    method: 'DELETE'
  })
    .then(function(res) {
      alertMessage(res, 'User data deleted succefully!');
    })
    .catch(function(res) {
      alertMessage(res);
    });
}

function alertMessage(res, text) {
  if (res.status === 200) {
    alert(text);
  } else {
    alert(res.statusText);
  }
}

export function showAlert(message) {
  // if (this.state.show) {
  return (
    <Alert bsStyle="danger" onDismiss={console.log('d')}>
      <h4>Oh snap! You got an error!</h4>
      <p>{message}</p>
      <p>
        <Button bsStyle="danger">Take this action</Button>
        <span> or </span>
        <Button onClick={console.log('d')}>Hide Alert</Button>
      </p>
    </Alert>
  );
}
