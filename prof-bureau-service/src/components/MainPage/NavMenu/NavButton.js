import React from 'react'
import './NavigationBlock.css'
import './ComissionIcons.css'
import {setComInfo} from "../../../redux/actions"
import { connect } from 'react-redux'

class NavButton extends React.Component {

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
                        onClick={() => this.props.setComission(comission)}
                >
                    <div className={cssClass}></div>
                    <div className='text'>{comission}</div>
                </div>
            </li>
        )
    }
}

const mapDispatchToProps = {
    setComission:setComInfo
}

export default connect(null, mapDispatchToProps)(NavButton)