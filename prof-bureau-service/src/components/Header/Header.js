import React from 'react'
import './Header.css'
import { store } from '../../store'
import { changePage, setPersonalInfo } from '../../actions'
import ReactDOM from 'react-dom'
import App from '../../App'

export default class Header extends React.Component {

    setHeaderOpacity = (page) => {
        return page === 'account' ? 1 : 0.7
    }

    openMain = () => {
        store.dispatch({type: 'TO_MAIN_PAGE'})
        ReactDOM.render(<App />, document.getElementById("root"));
    }

    openAuth = () => {
        store.dispatch(changePage('auth'))
        ReactDOM.render(<App />, document.getElementById("root"));
    }

    changePage = actualPage => {
        if (actualPage === 'main') {
            fetch(this.props.url + 'get_personal_info/',{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    "stNum": store.getState().stNum
                }),
            
            })
            .then((response) => {
                return response.json()
            })
            .then((responseJson)=>{
                store.dispatch(setPersonalInfo(responseJson));
                ReactDOM.render(<App />, document.getElementById("root"));
            })
        } else if (actualPage === 'account') {
            this.openMain()
        }
    }

    logout = () => {
        fetch(this.props.url + 'vk_logout/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            return response.json()
        })
        .then((responseJson) => {
            console.log(responseJson)

        })
        .catch = error => {
            console.log(error)
        }

        store.dispatch({type: "LOGOUT"})
        ReactDOM.render(<App />, document.getElementById("root"));

        localStorage.removeItem('login')
        localStorage.removeItem('course')
        localStorage.removeItem('stNum')
        localStorage.removeItem('logged')
    }

    render() {
        const isAuthorized = store.getState().isAuthorized
        const actualPage = store.getState().page
        return(
            <header className='header' style={{opacity: this.setHeaderOpacity(actualPage)}}>
                <div style={{marginLeft: '5%'}}>
                    <button className='title-button'
                            onClick={() => this.openMain()}
                    >
                        <h1>ПБ ПМ-ПУ</h1>
                    </button>
                </div>
                <div className="personal-info">
                    <div className="personal-info-about">
                        <div className="personal-info-about-name">
                            {store.getState().login}
                        </div>
                        <div className="course">
                            {isAuthorized ? store.getState().course + ' курс' : ''}
                        </div>
                    </div>
                    <div className="acc-action">
                        <div className='personal-info-picture'></div>
                        
                        <div className="auth-or-exit">
                            <div className="acc-exit" onClick={() => this.logout()}>
                                {isAuthorized ? 'Выход' : ''}&#160;
                                </div>
                            <div className="acc-exit" onClick={() => this.openAuth()}>
                                {isAuthorized ? '' : 'Авторизация'}
                            </div>
                            <div className="acc-exit" onClick={() => this.changePage(actualPage)}>
                                {isAuthorized ? (actualPage === 'account' ? '| Выход из ЛК' : '| Вход в ЛК') : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}