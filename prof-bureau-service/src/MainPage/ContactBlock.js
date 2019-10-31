import React from 'react'
import './styles/ContactBlock.css'

export default class ContactBlock extends React.Component {

    render() {
        const chairmans = {
            'Профбюро': 'Малышева Алина',
            'Культмасс': 'Кудряшова Дарья',
            'HR': 'Васильвева Мария',
            'FunCom': 'Енин Никита',
            'PM-Design': 'Крылова Ольга',
            'СпортКом': 'Рыбаков Сергей',
            'PM-Partner': 'Барташук Анастасия',
            'Оформители': 'Чернышова Александра',
            'PM-Photo': 'Пахомова Арина'
        }
        // var comissionName = 'Профбюро'
        const {comission} = this.props
        return(
            <div className='contactBlock'>
                <div className='chairman'>
                    <div className='chairman-photo'>
                        {/* <img src='images/Me.jpg' style={{width: '100%', height: 'auto'}}/> */}
                    </div>
                    <a className='chairman-link'>
                        Председатель:<br/>{chairmans[comission]}
                    </a>
                    <button className='follow-button'>
                        Присоединиться <br/> к профбюро
                    </button>
                </div>
                <div className='socialNetworks'>
                    <h2 className='block-title'>Мы в соцсетях</h2>
                    <div className='social-net-icons'>
                        <div className='vk-icon'></div>
                        <div className='inst-icon'></div>
                    </div>
                </div>
            </div>
        )
    }
}