import React from 'react';  
import './styles/MainPage.css';
import Header from './Header'
import NavigationBlock from './NavigationBlock'
import InformationBlock from './InformationBlock';
import ContactBlock from './ContactBlock';
import ProjectsBlock from './ProjectsBlock';
import { runInThisContext } from 'vm';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        comission: 'Профбюро',
        isAuthorized: false,
        login: '',
        course: 0
    }

    changeComission = name => {
        this.setState({
            comission: name,
        })
    }

    // changeMainState = (inputLogin) => {
    //     this.setState({
    //         isAuthorized: true,
    //         login: inputLogin
    //     })
    // }
    
    render() {
        return(
            <div className="background">
                <Header changeComission={this.changeComission} 
                        isAuthorized={this.state.isAuthorized}
                        login={this.state.login}
                        course={this.state.course}/>
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