import React from 'react'
import './NavigationBlock.css'
import './ComissionIcons.css'
import { store } from '../../../store'
import { setComission } from '../../../actions'
import ReactDOM from 'react-dom'
import App from '../../../App'

export default class NavButton extends React.Component {

    changeComission = com => {
        store.dispatch(setComission(com))
        ReactDOM.render(<App />, document.getElementById("root"));
    }

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
                        onClick={() => this.changeComission(comission)}
                >
                    <div className={cssClass}></div>
                    <div className='text'>{comission}</div>
                </div>
            </li>
        )
    }
}