import React from 'react'
import './styles/Header.css'

export default class Header extends React.Component {
            constructor(props) {
                super(props)
            }

    render() {
        const { isAuthorized } = this.props
        const accExit = isAuthorized ? 'Выход' : 'Вход'
        const { login } = this.props
        const course = isAuthorized ? this.props.course + ' курс' : ''
        return(
            <header className='header'>
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
                    </div>
                    <div className="acc-action">
                        <div className='personal-info-picture'></div>
                        <div className="acc-exit">{accExit}</div>
                    </div>
                </div>
            </header>
        )
    }
}