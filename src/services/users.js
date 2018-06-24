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
}

export function addUser(userData) {
  return fetch(host, {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(userData)
  });
}

export function deleteUser(id) {
  return fetch(host + id, {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    method: 'DELETE'
  });
}

export function showUser(id) {
  return fetch(host + id);
}
