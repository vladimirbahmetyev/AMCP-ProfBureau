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
import { changePage, login, reloadLogin } from '../../actions';
import ReactDOM from 'react-dom'
import App from '../../App'

export default class MainPage extends React.Component {

    componentDidMount() {
        if (localStorage.getItem('login') !== null) {
            store.dispatch(reloadLogin([
                localStorage.getItem('login'),
                localStorage.getItem('course'),
                +localStorage.getItem('stNum'),
            ]))
            ReactDOM.render(<App />, document.getElementById("root"));
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
                        store.dispatch(changePage('reg'))
                        ReactDOM.render(<App />, document.getElementById("root"));
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
        store.dispatch(login(userInfo))
        ReactDOM.render(<App />, document.getElementById("root"));
        localStorage.setItem('login', userInfo.name)
        localStorage.setItem('course', userInfo.course)
        localStorage.setItem('stNum', userInfo.stNum)
    }

    setScreen = () => {
        let page = store.getState().page
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
            return <PersonalAccount persAccInfo={store.getState().responseData} url={this.props.url} user={store.getState().stNum}/>
        } else if (page === 'auth' || page === 'reg') {
            return <Authorization url={this.props.url} login={this.login}/>
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