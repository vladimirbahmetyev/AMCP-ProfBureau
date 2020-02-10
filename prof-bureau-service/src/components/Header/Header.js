import React from 'react'
import './Header.css'
import { login, changePage, logout, toMainAcc, toPersAcc, setUserInfo} from '../../redux/actions'
import {connect} from "react-redux"



class Header extends React.Component {

    setHeaderOpacity = (page) => {
        return page === 'account' ? 1 : 0.7
    }

    changePageHandler = actualPage => {
        if (actualPage === 'main') {
            fetch(this.props.url + 'get_personal_info/',{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    "stNum": this.props.stNum
                }),
            
            })
            .then((response) => {
                return response.json()
            })
            .then((responseJson)=>{
                this.props.setUserInfo(responseJson)
            })
        } else if (actualPage === 'account') {
            this.props.toMainAcc()
        }
    }

    logoutHandler = () => {
        
        this.props.logout()

        localStorage.removeItem('login')
        localStorage.removeItem('course')
        localStorage.removeItem('stNum')
        localStorage.removeItem('logged')
    }
    render() {
        const isAuthorized = this.props.isAuthorized
        const actualPage = this.props.page
        return(
            <header className='header' style={{opacity: this.setHeaderOpacity(actualPage)}}>
                <div style={{marginLeft: '5%'}}>
                    <button className='title-button'
                            onClick={() => this.props.toMainAcc()}
                    >
                        <h1>ПБ ПМ-ПУ</h1>
                    </button>
                </div>
                <div className="personal-info">
                    <div className="personal-info-about">
                        <div className="personal-info-about-name">
                            {this.props.login}
                        </div>
                        <div className="course">
                            {isAuthorized ? this.props.course + ' курс' : ''}
                        </div>
                    </div>
                    <div className="acc-action">
                        <div className='personal-info-picture'></div>
                        
                        <div className="auth-or-exit">
                            <div className="acc-exit" onClick={() => this.logoutHandler()}>
                                {isAuthorized ? 'Выход' : ''}&#160;
                                </div>
                            <div className="acc-exit" onClick={() => this.props.changePage('auth')}>
                                {isAuthorized ? '' : 'Авторизация'}
                            </div>
                            <div className="acc-exit" onClick={() => this.changePageHandler(actualPage)}>
                                {isAuthorized ? (actualPage === 'account' ? '| Выход из ЛК' : '| Вход в ЛК') : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

function mapStateToProps(state){
    const {page, login, course, stNum, isAuthorized} = state
    return {
        page,
        login,
        course,
        stNum,
        isAuthorized
    }
}

const mapDispatchToProps = {
    login:login,
    changePage:changePage,
    logout:logout,
    toMainAcc:toMainAcc,
    toPersAcc:toPersAcc,
    setUserInfo:setUserInfo
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)