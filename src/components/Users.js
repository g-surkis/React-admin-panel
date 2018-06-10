import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
// import {Grid, Button, Navbar, Table} from 'react-bootstrap';
import AddUser from './AddUser';
import Edit from './Edit';
import TableUsers from './TableUsers';

//const history = createBrowserHistory();

class Users extends Component {
  constructor(props) {
    super(props);
    //this.numId = 0;
    this.state = {
      add: false,
      arr: []
    };

    //@ краще в одну стрічку
    //#в мене стоїть плагін для форматування коду.
    //там потрібно покопатись в настройках. в майбутньому врахую

    this.handleDelete = this.handleDelete.bind(this);

    this.loadData = this.loadData.bind(this);
  }

  // loadUsers() {
  //     // var tableUsers = document.getElementById('users');
  //     // console.log(tableUsers);
  //     var arr = [];
  //     // var schema;
  //     fetch('http://localhost:3001/users').then(function (response) {
  //         //console.log(response);
  //         return response.json();
  //     })
  //         .then(function (users) {
  //             //return users;
  //             for (let i = 0; i < users.length; i++) {
  //                 //console.log(users[i]);
  //                 let id = users[i].id;
  //                 let name = users[i].name;
  //                 let email = users[i].email;
  //                 arr[i] = users[i];

  //                 // var el = "<tr><td>" + {id} + "</td><td>" + {name}+ "</td><td>" + {email}  + "</td><button class='btn-success'></button></td></tr>";
  // console.log(typeof schema);
  // schema += el;

  //arr[i] = {id, name, email};
  //@ в реакті не потрібно використовувати document.createElement
  //@ потрібно використовувати шаблони як в методі render
  //@ в шаблонах можна пикористовувати цикли і умови
  //@ цей метод потрібно повністю переписати

  // sum += <Row id={id} name={name} email={email} />;
  // console.log(sum);
  // return sum;
  // var tr = document.createElement('tr');
  // var tr1 = `<tr></tr>`;
  // console.log(typeof tr1);
  // for (let i = 0; i < 4; i++) {
  //     if (i < 3) {
  //         let td = document.createElement('td');
  //         td.innerHTML = arr[i];
  //         tr.append(td);
  //     } else {
  //         let td = document.createElement('td');
  //         let buttonEdit = document.createElement('button');
  //         buttonEdit.innerHTML = 'Edit';
  //         buttonEdit.key = id;
  //         buttonEdit.setAttribute('class', 'btn-success');
  //         buttonEdit.onclick = function () {
  //             ReactDOM.render(
  //                 //тут теж контекст якийсь свій, не видно
  //                 //функцій класа, тому мусив зробити так
  //                 <Edit id={id} nameUser={name} emailUser={email}/>, document.getElementById('root'))

  //         };

  //         td.append(buttonEdit);
  //         let buttonDelete = document.createElement('button');
  //         buttonDelete.innerHTML = 'Delete';
  //         buttonDelete.setAttribute('class', 'btn-warning');
  //         // цей запис відбувається просто в обєкт як є? я пробував в атрибут, але
  //         // пізніше придіставанні з атрибута мені давало обєкт а не число. і я незнав що
  //         // з тим робити
  //         buttonDelete.key = id;
  //         buttonDelete.onclick = function (event) {
  //             let key = event.target.key;
  //             //console.log(typeof event.target.key);
  //             fetch('http://localhost:3001/users/' + key, {
  //                 headers: {
  //                     'Accept': 'application/json',
  //                     'Content-type': 'application/json'
  //                 },
  //                     method: "DELETE"
  //                 })
  //                 .then(function (res) {
  //                     console.log(res);
  //                 })
  //                 .catch(function (res) {
  //                     console.log(res);
  //                 })
  //                 // хотів винести деякий функціонал в іншу функцію, та чомусь не працює??????????
  //                 //    this.handleDelete(key);
  //                 //@ а this на що вказує?
  //                 // можна використовувати arrow function,  що б this  вказував на компонент

  //             //@ так не можна робити, вся сторінка ніколи не має перезавантажуватись
  //                 window
  //                 .location
  //                 .reload(); //підходить таке для перезагрузки
  //         };

  //         td.append(buttonDelete);
  //         tr.append(td);
  //     }
  // }
  // tableUsers.append(tr);
  //             }
  //           //  return users;

  //         })
  //         .catch(console.error()); //вивід помилок

  //        return arr;
  // };

  handleDelete(key) {
    alert(key);
  }

  addUser() {
    this.setState({ add: true });
  }

  buttonsAdd() {
    return (
      <td>
        <button className="btn-success" />
        <button className="btn-warning" />
      </td>
    );
  }

  componentWillMount() {// will or did? what better?
    this.loadData();
  }

  async loadData() {
    const rawResponse = await fetch('http://localhost:3001/users');
    const content = await rawResponse.json();
    await console.log(content);
    await this.setState({ arr: content });
  }

  render() {
    if (this.state.add) {
      return (
        <div>
          <div>
            <AddUser lastid={this.state.numId} />
          </div>
          <div className="container">
            

            <TableUsers arr={this.state.arr} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <button onClick={this.addUser.bind(this)} className="btn btn-warning">
            Add user!
          </button>

          <TableUsers arr={this.state.arr} />
        </div>
      );
    }
  }
}

export default Users;
