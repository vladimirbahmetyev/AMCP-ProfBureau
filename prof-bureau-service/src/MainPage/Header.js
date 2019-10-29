import React from 'react'
import './Header.css'

export default class Header extends React.Component {

    render() {
        return(
            <header className='header'>
                <div className='title'>
                    <h1>Профбюро ПМ-ПУ</h1>
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
                        <div className="personal-info-picture">
                        </div>
                        <div className="acc-exit">Выход</div>
                    </div>
                </div>
            </header>
        )
    }
}