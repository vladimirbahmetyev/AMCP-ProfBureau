import React from 'react';  
import './styles/MainPage.css';
import Header from './Header'
import NavigationBlock from './NavigationBlock'
import InformationBlock from './InformationBlock';
import ContactBlock from './ContactBlock';
import ProjectsBlock from './ProjectsBlock';
// import { runInThisContext } from 'vm';
import PersonalAccount from '../Personal Acc/PersonalAcc'

export default class MainPage extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        comission: 'Профбюро',
        isAuthorized: false,
        login: '',
        course: 0,
        page: 'main'
    }

    changeComission = name => {
        this.setState({
            comission: name,
        })
    }

    changePage = page => {
        this.setState({
            page: page
        })
    }

    // changeMainState = (inputLogin) => {
    //     this.setState({
    //         isAuthorized: true,
    //         login: inputLogin
    //     })
    // }
    
    render() {
        if (this.state.page === 'main') {
            return(
                <div className="background">
                    <Header changeComission={this.changeComission} 
                            isAuthorized={this.state.isAuthorized}
                            login={this.state.login}
                            course={this.state.course}
                            changePage={this.changePage}/>
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
        } else if (this.state.page === 'account') {
            return <PersonalAccount changePage={this.changePage}/>
        }
    }
}