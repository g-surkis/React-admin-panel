export default function editFetch(id, obj) {
  fetch('http://localhost:3001/users/' + id, {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify(obj)
  })
    .then(function(res) {
      console.log(res);
    })
    .catch(function(res) {
      console.log(res);
    });
}
