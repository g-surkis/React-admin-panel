// var http = require('http');
// var url = require('url');
// var querystring = require('querystring');
// var static = require('node-static');
// var file = new static.Server('.', {
//   cache: 0
// });


// function accept(req, res) {

//   if (req.url == '/users.json') {
//     // искусственная задержка для наглядности
//     setTimeout(function() {
//       file.serve(req, res);
//     }, 2000);
//   } else {
//     file.serve(req, res);
//   }

// }


// // ------ запустить сервер -------

// if (!module.parent) {
//   http.createServer(accept).listen(3001);
// } else {
//   exports.accept = accept;
// }


// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router('db.json');
// const middleweares = jsonServer.defaults();

// server.use(middleweares);
// server.use(router)
// server.listen(3000, () => {
//   console.log('All OK');
// })



// var express = require('express');
// var app = express();

// app.use(express.static('users.json'));

// app.listen(3000, function(){
//     console.log('Listening on 3000..');
// });















