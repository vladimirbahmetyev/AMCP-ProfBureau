import React from 'react'
import './styles/Header.css'

export default class Header extends React.Component {

    setHeaderOpacity = (page) => {
        return page === 'account' ? 1 : 0.7
    }

    render() {
        const { isAuthorized } = this.props
        const { page } = this.props
        const auth = isAuthorized ? 'Выход' : 'Авторизация'
        const accExit = isAuthorized ? (page === 'account' ? '| Выход из ЛК' : '| Вход в ЛК') : ''
        const { login } = this.props
        const course = isAuthorized ? this.props.course + ' курс' : ''
        // const deleteAcoount = isAuthorized ? 'Удалить аккаунт' : ''
        return(
            <header className='header' style={{opacity: this.setHeaderOpacity(page)}}>
                <div style={{marginLeft: '10%'}}>
                    <button className='title-button'
                            onClick={() => this.props.changeComission('Профбюро')}
                    >
                        <h1>Профбюро ПМ-ПУ</h1>
                    </button>
                </div>
                <div className="personal-info">
                    <div className="personal-info-about">
                        <div className="personal-info-about-name">
                            {login}
                        </div>
                        <div className="course">
                            {course}
                        </div>
                        {/* <div className='del-account'>
                            {deleteAcoount}
                        </div> */}
                    </div>
                    <div className="acc-action">
                        <div className='personal-info-picture'></div>
                        
                        <div className="auth-or-exit">
                            {/* <div className="acc-exit" onClick={() => this.props.openAuth(true)}>
                                {auth}&#160;
                            </div> */}
                            <div className="acc-exit"
                                onClick={() => {
                                    if (isAuthorized) return this.props.logout()
                                    else return this.props.openAuth(true)}}>
                                {auth}&#160;
                            </div>
                            <div className="acc-exit" onClick={() => this.props.changePage()}>
                                {accExit}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}