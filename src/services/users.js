export function editFetch(id, obj) {
  fetch('http://localhost:3001/users/' + id, {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify(obj)
  })
    .then(function(res) {
      alertMessageEdit(res);
    })
    .catch(function(res) {
      alertMessageEdit(res);
    });
}

export function addFetch(obj) {
  fetch('http://localhost:3001/users', {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(obj)
  })
    .then(function(res) {
      alertMessageAdd(res);
    })
    .catch(function(res) {
      alertMessageAdd(res);
    });
}

export function deleteFetch(id) {
  fetch('http://localhost:3001/users/' + id, {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    method: 'DELETE'
  })
    .then(function(res) {
      alertMessageDelete(res);
    })
    .catch(function(res) {
      alertMessageDelete(res);
    });
}

//ці функції нижче мабуть можна обєднати в одну, але ще не мав часу думати над цим

function alertMessageEdit(res) {
  if (res.status == 200) {
    alert('User data corrected succefully!');
  } else {
    alert(res.statusText);
  }
}

function alertMessageAdd(res) {
  if (res.status == 200) {
    alert('User data added succefully!');
  } else {
    alert(res.statusText);
  }
}

function alertMessageDelete(res) {
  if (res.status == 200) {
    alert('User data deleted succefully!');
  } else {
    alert(res.statusText);
  }
}
