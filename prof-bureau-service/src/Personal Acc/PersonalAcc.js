import  React from "react"
import './PersonalAcc.css'

const PersonalAccount = ({name, surname, course})=>(
    <div>
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
    <section className="comissions-and-actions">
        <div className="comissions-coloumn">
        <h2 className="com-title">Мои комиссии</h2>
        <div className="comissions-grid">
            <div className="pm-design com-item"></div>
            <div className="hr com-item"></div>
            <div className="pm-profi com-item com-not-active"></div>
            <div className=" pm-photo com-item com-not-active"></div>
            <div className="pm-video com-item com-not-active"></div>
            <div className="funcom com-item com-not-active"></div>
            <div className="sportcom com-item com-not-active"></div>
            <div className="mounting com-item com-not-active"></div>
            <div className="cultmass com-item"></div>
            <div className="smi com-item com-not-active"></div>
        </div>
        </div>
        <div className="actions-coloumn">
        <div className="actions">
            <h1 className="actions-title">Актуальные события</h1>
        </div>
        </div>
    </section>
    <section className="task-status">
        <div className="new-tasks-container">
            <h1 className="new-task-title"> Мой швапс</h1>
            <ul className="new-tasks-list">
                <li className="new-task-item"></li>
                <li className="new-task-item"></li>
                <li className="new-task-item"></li>
                <li className="new-task-item"></li>
            </ul>
        </div>
        <div className="ended-tasks-container">
            <h1 className="ended-task-title">Выпитый швапс</h1>
            <ul className="ended-tasks-list">
                <li className="ended-task-item finish-task"></li>
                <li className="ended-task-item"></li>
                <li className="ended-task-item"></li>
                <li className="ended-task-item"></li>
            </ul>
        </div>
    </section>
    </div>
);

export default PersonalAccount