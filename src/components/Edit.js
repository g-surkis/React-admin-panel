import React, { Component } from 'react';
import { Grid, Button, Navbar, Table } from 'react-bootstrap';

import { editFetch } from '../services/users';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueName: this.props.name,
      valueEmail: this.props.email
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
  }

  handleChangeName(event) {
    this.setState({ valueName: event.target.value });
    console.log(event.target.value);
  }

  handleChangeEmail(event) {
    this.setState({ valueEmail: event.target.value });
    console.log(event.target.value);
  }

  handleEdit(event) {
    let id = this.props.id;
    alert(id);
    //@ передивись відео як працювати з елементами форми
    //@ в реакті ніколи не потрібно доступатись до елемента через document.getElementById
    //@ і не потрібно в шаблонах вказувати id елемента
    //@ є два підходи доступатись до елементів - через контрольовані компоненти з використанням state
    //@ <input type="text" value={this.state.value} onChange={this.handleChange} />
    //@ або не контрольовані через ref
    //@ <input type="text" ref={(input) => this.input = input} />

    //тут про ref мабуть треба ще почитати, бо я відео дивився, а згадати суті не можу
    let name = this.state.valueName;
    let email = this.state.valueEmail;
    let obj = {
      name,
      email
    };
    console.log(this.props);
    console.log(obj);
    //@ !потрібно створити папку services і в ній файл users.js з функціями, де
    //@ !виконуються запити через fetch, що б компоненти не знали як ідуть запити до бекенду і при
    //@ !потребі наприклад зміни url можна було все робити в одному місці
    //@ потрібно алерт показувати, що все зберіглось добре, якщо виникла помилка, також це потрібно
    //@показати

    editFetch(id, obj); //??????????????   IS THIS CORRERCT?
    event.preventDefault();
  }

  render() {
    console.log(this.state);
    return (
      <div className="appearWindow">
        <h1 className="brand">Редагування даних користувача</h1>
        {/* <!--//@ цих полів не потрібно, тому що форми для SPA не перезавантажуться, тому
                id="addUser треба забрати і повісити обробник на onSubmit, щоб на enter також спрацьовувала форма
                --> */}
        <form onSubmit={this.handleEdit} className="navbar-form input-group">
          <label htmlFor="name">
            Name
            <input
              type="text"
              onChange={this.handleChangeName}
              defaultValue={this.state.valueName}
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              onChange={this.handleChangeEmail}
              defaultValue={this.state.valueEmail}
            />
          </label>
          <span />
          <button
            type="submit"
            //@ краще в одну стрічку писати, що б було легше читати і краще робити в конструкторі
            // @ this.handleEdit = this.handleEdit.bind(this)
            // @ тоді тут можна просто писати onClick={this.handleEdit}
            onClick={this.handleEdit}
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
