import React from 'react'
import './styles/NavigationBlock.css'
import './styles/ComissionIcons.css'

export default class NavButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {comission} = this.props

        let cssClass = "com-icon " + comission

        if (comission === 'Культмасс') {
            cssClass = 'com-icon cultmass'
        } else if (comission === 'СпортКом') {
            cssClass = 'com-icon sportcom'
        } else if (comission === 'Оформители') {
            cssClass = 'com-icon oformiteli'
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