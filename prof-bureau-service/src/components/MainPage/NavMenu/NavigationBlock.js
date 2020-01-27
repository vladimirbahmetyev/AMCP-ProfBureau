import React from 'react'
import './NavigationBlock.css'
import NavButton from './NavButton'

export default class NavigationBlock extends React.Component {

    render() {
        return(
            <div className='nav-block'>
                <ul className="comissionList">
                    <NavButton comission='Культмасс' />
                    <NavButton comission='HR' />
                    <NavButton comission='FunCom' />
                    <NavButton comission='PM-Design' />
                    <NavButton comission='СпортКом' />
                    <NavButton comission='PM-Partner' />
                    <NavButton comission='Оформители' />
                    <NavButton comission='PM-Photo' />
                </ul>
            </div>
        )
    }
}