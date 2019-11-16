import React from 'react'
import './styles/NavigationBlock.css'
import NavButton from './NavButton'

export default class NavigationBlock extends React.Component {

    render() {
        return(
            <div className='nav-block'>
                <ul className="comissionList">
                    <NavButton comission='Культмасс' changeComission={this.props.changeComission}/>
                    <NavButton comission='HR' changeComission={this.props.changeComission}/>
                    <NavButton comission='FunCom' changeComission={this.props.changeComission}/>
                    <NavButton comission='PM-Design' changeComission={this.props.changeComission}/>
                    <NavButton comission='СпортКом' changeComission={this.props.changeComission}/>
                    <NavButton comission='PM-Partner' changeComission={this.props.changeComission}/>
                    <NavButton comission='Оформители' changeComission={this.props.changeComission}/>
                    <NavButton comission='PM-Photo' changeComission={this.props.changeComission}/>
                </ul>
            </div>
        )
    }
}