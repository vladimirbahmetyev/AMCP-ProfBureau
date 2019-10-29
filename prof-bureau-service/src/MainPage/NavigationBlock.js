import React from 'react'
import './NavigationBlock.css'

export default class NavigationBlock extends React.Component {

    render() {
        return(
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
        )
    }
}