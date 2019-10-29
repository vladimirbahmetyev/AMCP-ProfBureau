import React from 'react';  
import './App.css';

function App() {
  return (
    <div className="background">
        <header className='header'>
            <div className='title'>
                <h1>Профбюро ПМ-ПУ</h1>
            </div>
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
        <div className='mainBlock'>
            <div className='nav-block'>
                <ul className="comissionList">
                  <li className='listElement'>Культмасс</li>
                  <li className='listElement'>HR</li>
                  <li className='listElement'>FunCom</li>
                  <li className='listElement'>PM-Design</li>
                  <li className='listElement'>СпортКом</li>
                  <li className='listElement'>PM-Partner</li>
                  <li className='listElement'>Оформители</li>
                  <li className='listElement'>PM-Photo</li>
                </ul>
            </div>
            <div className='content'>
                <div className='informationBlock'>
                    <h2 className='block-title'>Название комиссии</h2>
                    Профсоюз факультета ПМ-ПУ — это большой и дружный коллектив, 
                    объединённый общей идеей — сделать годы обучения незабываемыми.
                    <br/><br/>
                    Он состоит из 8 комиссий, сферы деятельности которых охватывают 
                    все сферы студенческой жизни. Мы помогаем воплощать даже самые 
                    сумасшедшие идеи, раскрываем таланты и дарим бесценный опыт. 
                    Общественная деятельность на нашем факультете одна из самых ярких, 
                    благодаря нашим ребятам. И вы в любой момент можете стать частью этой команды!
                    <br/><br/>
                    Все вопросы, обращения и пожелания к Профбюро Вы можете присылать 
                    по адресу: profburo@spbu.ru или председателю.
                </div>
                <div className='contactBlock'>
                    <div className='chairman'>
                        {/* <img src='Alina.jpg' width='100' className='chairman-photo'></img> */}
                        <div className='chairman-photo'></div>
                        <a className='chairman-link'>
                            Председатель: Малышева Алина Игоревна
                        </a>
                        <button className='follow-button'>
                            Присоединиться <br/> к профбюро
                        </button>
                    </div>
                    <div className='socialNetworks'>
                        <h2 className='block-title'>Мы в соцсетях</h2>
                        <div>
                            Vk-shechka <br/> Instogramchek <br/> Contact us
                        </div>
                    </div>
                </div>
                <div className='projects-block'>
                    <h2 className='block-title'> Некоторые проекты </h2>
                    <div className='projects'>
                        <div className='proj-preview'>
                        <div className='project-image'></div>
                            <p>project 1</p>
                        </div>
                        <div className='proj-preview'>
                        <div className='project-image'></div>
                            <p>project 2</p>
                        </div>
                        <div className='proj-preview'>
                            <div className='project-image'></div>
                            <p>project 3</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
