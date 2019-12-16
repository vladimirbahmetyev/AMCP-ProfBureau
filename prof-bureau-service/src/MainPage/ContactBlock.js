import React from 'react'
import './styles/ContactBlock.css'
import './styles/ChairmanPhoto.css'

export default class ContactBlock extends React.Component {

    render() {
        const chairmans = {
            'Профбюро': ['Малышева Алина', 'https://vk.com/id134292524'],
            'Культмасс': ['Кудряшова Дарья', 'https://vk.com/kudaryashova'],
            'HR': ['Васильвева Мария', 'https://vk.com/prvlmr'],
            'FunCom': ['Енин Никита', 'https://vk.com/lokomtehnic'],
            'PM-Design': ['Крылова Ольга', 'https://vk.com/olyakrylo'],
            'СпортКом': ['Рыбаков Сергей', 'https://vk.com/kaspar7'],
            'PM-Partner': ['Барташук Анастасия', 'https://vk.com/ananassta'],
            'Оформители': ['Чернышова Александра', 'https://vk.com/sashachernyshova'],
            'PM-Photo': ['Пахомова Арина', 'https://vk.com/pahooomova']
        }

        const {comission} = this.props
        let cssClassPhoto = "chairman-photo " + comission + "-photo"
        if (comission === 'Профбюро') {
            cssClassPhoto = 'chairman-photo pb-photo'
        } else if (comission === 'Культмасс') {
            cssClassPhoto = 'chairman-photo cultmass-photo'
        } else if (comission === 'СпортКом') {
            cssClassPhoto = 'chairman-photo sportcom-photo'
        } else if (comission === 'Оформители') {
            cssClassPhoto = 'chairman-photo oformiteli-photo'
        }

        return(
            <div className='contactBlock'>
                <div className='chairman'>
                    <div className={cssClassPhoto}></div>
                    <a className='chairman-link' href={chairmans[comission][1]} rel="noopener noreferrer" target='_blank'>
                        Председатель:<br/>{chairmans[comission][0]}
                    </a>
                    <button className='follow-button' onClick={() => this.props.openAuth(true)}>
                        Присоединиться <br/> к профбюро
                    </button>
                </div>
                <div className='socialNetworks'>
                    <h2 className='block-title'>Мы в соцсетях</h2>
                    <div className='social-net-icons'>
                        <a className='vk-icon' href='https://vk.com/pmpu_news/' target='_blank' rel="noopener noreferrer"></a>
                        <div className='inst-icon'></div>
                    </div>
                </div>
            </div>
        )
    }
}