// import React, { Component } from 'react';
// import { Alert, Button } from 'react-bootstrap';
const host = 'http://localhost:3001/users/';

export function updateUser(id, userData) {
  return fetch('http://localhost:3001/users/' + id, {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify(userData)
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
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
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  });
}

export function deleteUser(id) {
  return fetch(host + id, {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    method: 'DELETE'
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  });
}

export function showUser(id) {
  return fetch(host + id).then(response => {
    if (response.ok) {
      return response.json();
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  });
}

export function loadUsers() {
  return fetch('http://localhost:3001/users').then(response => {
    if (response.ok) {
      return response.json();
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  });
}
