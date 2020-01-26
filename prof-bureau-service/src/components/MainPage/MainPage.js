import React from 'react';  
import './MainPage.css';
import Header from '../Header/Header'
import NavigationBlock from './NavMenu/NavigationBlock'
import InformationBlock from './InfoBlock/InformationBlock';
import ContactBlock from './ContactBlock/ContactBlock';
import ProjectsBlock from './ProjectsBlock/ProjectsBlock';
import PersonalAccount from '../Personal Acc/PersonalAcc'
import Authorization from './Authorization/Authorization'

import { store } from '../../store'

export default class MainPage extends React.Component {

    state = {
        // comission: 'Профбюро',
        isAuthorized: false,
        login: '',
        course: 0,
        page: 'main',
        stNum: 0,
        responseData: JSON.stringify(''),
        authWindow: 'auth',
        vkName: '',
        vkSurname: ''
    }

    componentWillMount() {
        if (localStorage.getItem('login') !== null) {
            this.setState({
                isAuthorized: true,
                login: localStorage.getItem('login'),
                course: localStorage.getItem('course'),
                stNum: +localStorage.getItem('stNum'),
                page: 'main'
            })
        } else if (localStorage.getItem('logged')) {
            fetch(this.props.url + 'vk_login/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                return response.json()
            })
            .then((responseJson) => {
                console.log(responseJson)
                if (responseJson.success) {
                    if (responseJson.isReged) {
                        console.log('reged')
                        let userInfo = {
                            "course": responseJson.course,
                            "name": responseJson.name,
                            "stNum": responseJson.stNum,
                        }
                        this.login(userInfo)
                    } else {
                        console.log('not reged')
                        this.setState({
                            page: 'auth',
                            authWindow: 'reg',
                            vkName: responseJson.name.split(' ')[0],
                            vkSurname: responseJson.name.split(' ')[1]
                        })
                    }
                } else {
                    console.log(responseJson.error)
                }
            })
            .catch = error => {
                console.log(error)
            }
        }
    }

    changeComission = name => {
        // this.setState({ comission: name })

        if (this.state.page === 'account') {
            this.setState({page: 'main'})
        }
    }

    login = (userInfo) => {
        this.setState({
            isAuthorized:true,
            login: userInfo.name,
            course: userInfo.course,
            stNum: userInfo.stNum,
            page: 'main' 
        })

        localStorage.setItem('login', userInfo.name)
        localStorage.setItem('course', userInfo.course)
        localStorage.setItem('stNum', userInfo.stNum)
    }
    
    logout = () => {
        fetch(this.props.url + 'vk_logout/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            return response.json()
        })
        .then((responseJson) => {
            console.log(responseJson)
        })
        .catch = error => {
            console.log(error)
        }

        this.setState({
            isAuthorized: false,
            login: '',
            course: 0,
            stNum: 0,
            page: 'main'
        })

        localStorage.removeItem('login')
        localStorage.removeItem('course')
        localStorage.removeItem('stNum')
        localStorage.removeItem('logged')
    }

    changePage = (page) => {
        if (page === 'main') {
            fetch(this.props.url + 'get_personal_info/',{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    "stNum": this.state.stNum
                }),
            
            })
            .then((response) => {
                return response.json()
            })
            .then((responseJson)=>{
                this.setState({
                    responseData: responseJson,
                    page: 'account'
                })
            })
        } else if (page === 'account') {
            this.setState({
                page: 'main'
            })
        }
    }

    setScreen = () => {
        let page = this.state.page
        if (page === 'main') {
            return(
                <div className='mainBlock'>
                    <NavigationBlock changeComission={this.changeComission} />
                    <div className='content'>
                        <InformationBlock comission={store.getState().comission}/>
                        <ContactBlock comission={store.getState().comission} openAuth={this.openAuth} isAuthorized={this.state.isAuthorized}/>
                        <ProjectsBlock />
                    </div>
                </div>
            )
        } else if (page === 'account') {
            return <PersonalAccount persAccInfo={this.state.responseData} url={this.props.url} user={this.state.stNum}/>
        } else if (page === 'auth') {
            return <Authorization openAuth={this.openAuth} login={this.login} 
                    url={this.props.url} window={this.state.authWindow}/>
        }
    }

    openAuth = (flag) => {
        this.setState({
            page: flag ? 'auth' : 'main'
        })
    }
    
    render() {
            return(
                <div className="background">
                    <Header changeComission={this.changeComission} 
                            isAuthorized={this.state.isAuthorized}
                            login={this.state.login}
                            course={this.state.course}
                            changePage={this.changePage}
                            openAuth={this.openAuth}
                            page={this.state.page}
                            logout={this.logout}/>
                    {this.setScreen()}
                </div>   
            )
    }
}