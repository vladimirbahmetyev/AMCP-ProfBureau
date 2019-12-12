import React from 'react';  
import './styles/MainPage.css';
import Header from './Header'
import NavigationBlock from './NavigationBlock'
import InformationBlock from './InformationBlock';
import ContactBlock from './ContactBlock';
import ProjectsBlock from './ProjectsBlock';
import PersonalAccount from '../Personal Acc/PersonalAcc'
import Authorization from './Authorization/Authorization'

export default class MainPage extends React.Component {

    state = {
        comission: 'Профбюро',
        isAuthorized: true,
        login: '',
        course: 0,
        page: 'main',
        stNum: 0
    }

    changeComission = name => {
        this.setState({
            comission: name,
        })
    }

    login = (userInfo) => {
        this.setState({
            isAuthorized:true,
            login: userInfo.name,
            course: userInfo.course,
            stNum: userInfo.stNum,
            page: 'main' 
        })
    }        

    changePage = () => {
        const actualPage = this.state.page === 'main' ? 'main' : 'account'
        const anotherPage = actualPage === 'main' ? 'account' : 'main'
        this.setState({
            page: anotherPage
        })
    }

    setScreen = (page = this.state.page) => {
        if (page === 'main') {
            return(
                <div className='mainBlock'>
                    <NavigationBlock changeComission={this.changeComission} />
                    <div className='content'>
                        <InformationBlock comission={this.state.comission}/>
                        <ContactBlock comission={this.state.comission}/>
                        <ProjectsBlock />
                    </div>
                </div>
            )
        } else if (page === 'account') {
            return(
                <PersonalAccount />
            )
        } else if (page === 'auth') {
            return <Authorization openAuth={this.openAuth} login={this.login}/>
        }
    }

    openAuth = (flag) => {
        this.setState({
            page: flag ? 'auth' : 'main'
        })
    }

    // openReg = flag => {
    //     this.setState({
    //         page: flag ? 'reg' : 'main'
    //     })
    // }
    
    render() {
            return(
                <div className="background">
                    <Header changeComission={this.changeComission} 
                            isAuthorized={this.state.isAuthorized}
                            login={this.state.login}
                            course={this.state.course}
                            changePage={this.changePage}
                            openAuth={this.openAuth}/>
                    {this.setScreen()}
                </div>   
            )
    }
}