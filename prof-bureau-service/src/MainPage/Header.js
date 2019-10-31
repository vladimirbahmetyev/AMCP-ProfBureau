import React from 'react'
import './styles/Header.css'

export default class Header extends React.Component {
            constructor(props) {
                super(props)
            }

    render() {
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
                            [Имя] [Фамилия]
                        </div>
                        <div className="course">
                            [Курс]
                        </div>  
                    </div>
                    <div className="acc-action">
                        <div className='personal-info-picture'></div>
                        <div className="acc-exit">Выход</div>
                    </div>
                </div>
            </header>
        )
    }
}