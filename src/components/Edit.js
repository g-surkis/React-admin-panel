import React, { Component } from 'react';
import { Grid, Button, Navbar, Table } from 'react-bootstrap';

import editFetch from '../services/users';

class Edit extends Component {
  constructor(props) {
    super(props);
  }

  handleEdit() {
    // alert(this.props.nameUser);
    // alert(this.props.emailUser);
    let id = this.props.id;
    alert(id);
    //@ передивись відео як працювати з елементами форми
    //@ в реакті ніколи не потрібно доступатись до елемента через document.getElementById
    //@ і не потрібно в шаблонах вказувати id елемента
    //@ є два підходи доступатись до елементів - через контрольовані компоненти з використанням state
    //@ <input type="text" value={this.state.value} onChange={this.handleChange} />
    //@ або не контрольовані через ref
    //@ <input type="text" ref={(input) => this.input = input} />
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let obj = {
      name: name.value,
      email: email.value
    };

    //@ потрібно створити папку services і в ній файл users.js з функціями, де
    //@ виконуються запити через fetch, що б компоненти не знали як ідуть запити до бекенду і при
    //@ потребі наприклад зміни url можна було все робити в одному місці
    //@ потрібно алерт показувати, що все зберіглось добре, якщо виникла помилка, також це потрібно
    //@показати
    // fetch("http://localhost:3001/users/" + id, {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-type": "application/json"
    //   },
    //   method: "PATCH",
    //   body: JSON.stringify(obj)
    // })
    //   .then(function(res) {
    //     console.log(res);
    //   })
    //   .catch(function(res) {
    //     console.log(res);
    //   });
    editFetch(id, obj); //??????????????IS THIS CORRERCT?
  }

  render() {
    return (
      <div className="appearWindow">
        <h1 className="brand">Редагування даних користувача</h1>
        {/* <!--//@ цих полів не потрібно, тому що форми для SPA не перезавантажуться, тому
                id="addUser треба забрати і повісити обробник на onSubmit, щоб на enter також спрацьовувала форма
                --> */}
        <form
          id="addUser" //незнаю достеменно чи ці поля обовязкові в даному випадку
          //але працює без них(а з ними - не працює)(це мабуть з php таке в мене лишилося))
          //method="post"
          //action='http://localhost:3001/users'
          className="navbar-form input-group"
        >
          <label htmlFor="name">
            Name
            {/* <!--//@ id="name" не потрібно і в решті елементах також --> */}
            <input type="text" id="name" defaultValue={this.props.nameUser} />
          </label>

          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              defaultValue={this.props.emailUser}
            />
          </label>
          <span />
          <button
            type="submit"
            //@ краще в одну стрічку писати, що б було легше читати і краще робити в конструкторі
            // @ this.handleEdit = this.handleEdit.bind(this)
            // @ тоді тут можна просто писати onClick={this.handleEdit}
            onClick={this.handleEdit.bind(this)}
            className="btn btn-primery btn-success"
          >
            ADD
          </button>
        </form>
      </div>
    );
  }
}

export default Edit;
