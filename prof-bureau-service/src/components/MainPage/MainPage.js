import React from 'react';  
import './MainPage.css';
import Header from '../Header/Header'
import NavigationBlock from './NavMenu/NavigationBlock'
import InformationBlock from './InfoBlock/InformationBlock';
import ContactBlock from './ContactBlock/ContactBlock';
import ProjectsBlock from './ProjectsBlock/ProjectsBlock';
import PersonalAccount from '../Personal Acc/PersonalAcc'
import Authorization from './Authorization/Authorization'

import {login, changePage} from "../../redux/actions"

import {connect} from "react-redux"

class MainPage extends React.Component {

    componentDidMount() {
        if (localStorage.getItem('login') !== null) {
            this.props.login({
                login:localStorage.getItem('login'),
                course:localStorage.getItem('course'),
                stNum:localStorage.getItem('stNum')
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
                        this.props.login(userInfo)
                    } else {
                        console.log('not reged')
                        this.props.changePage('reg')
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

    login = (userInfo) => {
        this.props.login(userInfo)
        localStorage.setItem('login', userInfo.name)
        localStorage.setItem('course', userInfo.course)
        localStorage.setItem('stNum', userInfo.stNum)
    }

    setScreen = () => {
        let page = this.props.page
        if (page === 'main') {
            return(
                <div className='mainBlock'>
                    <NavigationBlock />
                    <div className='content'>
                        <InformationBlock />
                        <ContactBlock />
                        <ProjectsBlock />
                    </div>
                </div>
            )
        } else if (page === 'account') {
            return <PersonalAccount persAccInfo={this.props.responseData} url={this.props.url} user={this.props.stNum}/>
        } else if (page === 'auth' || page === 'reg') {
            return <Authorization url={this.props.url} login={this.props.login}/>
        }
    }
    
    render() {
            return(
                <div className="background">
                    <Header url={this.props.url} />
                    {this.setScreen()}
                </div>   
            )
    }
}

function mapStateToProps(state) {
    const {page, responseData, stNum} = state
    return{
        page:page,
        responseData:responseData,
        stNum:stNum
    }
}
const mapDispatchToProps = {
    login:login,
    changePage:changePage
}

export default connect(mapStateToProps)(MainPage)