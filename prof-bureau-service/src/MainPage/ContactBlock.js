import React from 'react'
import './ContactBlock.css'

export default class ContactBlock extends React.Component {

    render() {
        return(
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
        )
    }
}