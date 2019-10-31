import React from 'react';  
import './styles/MainPage.css';
import Header from './Header'
import NavigationBlock from './NavigationBlock'
import InformationBlock from './InformationBlock';
import ContactBlock from './ContactBlock';
import ProjectsBlock from './ProjectsBlock';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        comission: 'Профбюро'
    }

    changeComission = name => {
        this.setState({
            comission: name,
        })
    }
    
    render() {
        return(
            <div className="background">
                <Header changeComission={this.changeComission}/>
                <div className='mainBlock'>
                    <NavigationBlock changeComission={this.changeComission} />
                    <div className='content'>
                        <InformationBlock comission={this.state.comission}/>
                        <ContactBlock comission={this.state.comission}/>
                        <ProjectsBlock />
                    </div>
                </div>
            </div>
        )
    }
}