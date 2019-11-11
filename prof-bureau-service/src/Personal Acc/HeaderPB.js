import React from 'react';
import './HeaderPB.css'

export default class HeaderPB extends React.Component{

    state = {
        exampleState: true,
        secondExampleState: 0
    }

    render() {
        return(
            <header>
        <h1 className="pers-account-title"> Пб|Профбюро ПМ-ПУ</h1>
        
        <div className="personal-info">
            <div className="personal-info-about">
                <div className="personal-info-about-name">
                    [Имя][Фамилия]
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