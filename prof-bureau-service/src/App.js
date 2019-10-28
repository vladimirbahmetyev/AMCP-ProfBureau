import React from 'react';  
import './App.css';

function App() {
  return (
    <div className="background">
        <header className='header'>
            <p className='title'>Профбюро ПМ-ПУ</p>
        </header>
        <div className='mainBlock'>
            <div className='nav-block'>
                <ul className="comissionList">
                  <li className='listElement'>Comission 1</li>
                  <li className='listElement'>Comission 2</li>
                  <li className='listElement'>Comission 3</li>
                  <li className='listElement'>Comission 4</li>
                  <li className='listElement'>Comission 5</li>
                  <li className='listElement'>Comission 6</li>
                  <li className='listElement'>Comission 7</li>
                  <li className='listElement'>Comission 8</li>
                  <li className='listElement'>Comission 9</li>
                  <li className='listElement'>Comission 10</li>
                </ul>
            </div>
            <div className='content'>
                <div className='informationBlock'>
                    Information abouT comissions)))
                    <br/>
                    <br/>
                    And here will be a lot of text
                    <br/>
                    I need nemnogo strochek
                    <br/>
                    And esche nemuch
                </div>
                <div className='contactBlock'>
                    <div className='chairman'>
                        ы <br/> ыы <br/> ыыы <br/> ыыыы <br/> ыыыыы <br/><br/>
                        Here will be a photo of predsedatel
                    </div>
                    <div className='socialNetworks'>
                        Vk-shechka <br/> Instogramchek <br/> Contact us
                    </div>
                </div>
                <div className='projects'>
                    AND HERE WILL BE PROJECTS)))))
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
