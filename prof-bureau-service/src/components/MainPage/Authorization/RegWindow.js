import React from 'react'
import './Reg.css'
import { store } from '../../../store'
import { changePage } from '../../../actions'
import ReactDOM from 'react-dom'
import App from '../../../App'

export default class RegWindow extends React.Component{

    buttonClicked = () => {
        let name = document.getElementById('firstNameReg').value
        let surname = document.getElementById('lastNameReg').value
        let email = document.getElementById('e-mail').value
        let password = document.getElementById('password').value
        alert(name + " " + surname)
        if (name !== '' && surname !== '' && email !== '' && password.length >= 8) {
            fetch(this.props.url + 'registration/',{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    "firstName": name,
                    "lastName": surname,
                    "course": document.getElementById('course').value,
                    "email": email,
                    "password": password
                }),
            })
            .then((response) => {
                if (response.status === 200)
                    this.openAuth()
            })
        } else {
            alert('Wrong data!')
        }
    }

    openAuth = () => {
        store.dispatch(changePage('auth'))
        ReactDOM.render(<App />, document.getElementById("root"));
    }

    render() {
        return(
            <div className='reg-background'>
                <div className='reg-window'>
                    <p className='reg-text'>Регистрация</p>
                    <div className='reg-field'>
                        <p>Имя</p>
                        <input id='firstNameReg' type='text'></input>
                    </div>
                    <div className='reg-field'>
                        <p>Фамилия</p>
                        <input id='lastNameReg'></input>
                    </div>
                    <div className='reg-field'>
                        <p>Курс</p>
                        <select id='course' defaultValue='Выберите'>
                            <option disabled>Выберите</option>
                            <option value='1'>1 бакалавриат</option>
                            <option value='2'>2 бакалавриат</option>
                            <option value='3'>3 бакалавриат</option>
                            <option value='4'>4 бакалавриат</option>
                            <option value='5'>1 магистратура</option>
                            <option value='6'>2 магистратура</option>
                        </select>
                    </div>
                    <div className='reg-field'>
                        <p>Корпоративная почта</p>
                        <input id='e-mail'></input>
                    </div><div className='reg-field'>
                        <p>Пароль (не менее 8 символов)</p>
                        <input id='password' type='password'></input>
                    </div>
                    <div className='reg-buttons-field'>
                        <div className='reg-button' onClick={() => this.buttonClicked()}>
                            <p>Зарегистрироваться</p>
                        </div>
                    </div>
                </div>
                <div className='reg-close-circle' onClick={() => this.openAuth()}>
                </div>
            </div>
        )
    }
}