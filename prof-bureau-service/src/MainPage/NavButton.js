import React from 'react'
import './styles/NavigationBlock.css'
import './styles/ComissionIcons.css'

export default class NavButton extends React.Component {

    render() {
        const {comission} = this.props

        let cssClass = "com-icon " + comission + '-icon'

        if (comission === 'Культмасс') {
            cssClass = 'com-icon cultmass-icon'
        } else if (comission === 'СпортКом') {
            cssClass = 'com-icon sportcom-icon'
        } else if (comission === 'Оформители') {
            cssClass = 'com-icon oformiteli-icon'
        }
        return(
            <li>
                <div className='listElement'
                        onClick={() => this.props.changeComission(comission)}
                >
                    <div className={cssClass}></div>
                    <div className='text'>{comission}</div>
                </div>
            </li>
        )
    }
}