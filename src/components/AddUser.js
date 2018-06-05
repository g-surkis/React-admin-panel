import React, {Component} from 'react';

//import "bootstrap/dist/css/bootstrap.css";
import {Form, Button} from 'react-bootstrap';

//не розумію чому перезагружається сторінка після надсилання даних 
//це стандартна поведінка браузера??? ДОМ при цьому ж не міняється
//@ для форми стандратна поведінка, коли сабмітись форму, тому потрібно обробляти подію onSubmit і для події робити
//@ e.preventDefault();

class AddUser extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            obj: {
                "name": 'some',
                "email": 'some'
            }
        }
        //@ state ніде не використовується, тоді його тут не треба
        console.log(this.state.obj);

    }

    componentDidMount() {
        // працює дивно для мене, виводить NamedNodeMap let v = document
        // .getElementById('users')     .attributes; let d =
        // document.getElementById('users'); console.log(d); console.log(v);
    };

    handleAdd() {
        var name = document.getElementById('name');
        var email = document.getElementById('email');
        var obj = {
            //id: +this.props.lastid + 1,
            name: name.value,
            email: email.value
        }
        // alert(obj);
        fetch('http://localhost:3001/users', {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
                method: "POST",
                body: JSON.stringify(obj)
            })
            .then(function (res) {
                console.log(res);
            })
            .catch(function (res) {
                console.log(res);
            })

    }

    
    render() {
        // console.log(document.form.addUser);
        return (
            <form
                id="addUser"
                //незнаю достеменно чи ці поля обовязкові в даному випадку
                //але працює без них(а з ними - не працює)(це мабуть з php таке в мене лишилося))
                //method="post"
                //action='http://localhost:3001/users'
                className="navbar-form input-group">
                <label htmlFor="name">Name
                    <input
                        type="text"
                        id="name"
                        />
                </label>

                <label htmlFor="email">Email
                    <input type="email" id="email"/>
                </label>
                <span></span>
                <button
                    type="submit"
                    onClick={this
                    .handleAdd
                    .bind(this)}
                    className="btn btn-primery btn-success">ADD</button>
            </form>

        )
    }
}

export default AddUser;