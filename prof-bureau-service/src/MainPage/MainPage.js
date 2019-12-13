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
        isAuthorized: false,
        login: '',
        course: 0,
        page: 'main',
        stNum: 0
    }

    testJSON = {
        "userTasks":
            [{
                "title":"titleTask1",
                "description":"descriptionTask1"
            },
            {
                "title":"titleTask2",
                "description":"descriptionTask2"
            }
            ],
        "userTasksEnded":
            [{
                "title":"titleTaskEnded1",
                "description":"descriptionTaskEnded1"
            },
            {
                "title":"titleTaskEnded2",
                "description":"descriptionTaskEnded2"
            }
            ],
        
        "comInfo":{
            "PM-Design":{
                "predName":"Ольга крылова",
                "newsList":{},
                "taskList":[         
                    {
                        "title":"titleTask1",
                        "description":"descriptionTask1"
                    },
                   {
                        "title":"titleTask2",
                        "description":"descriptionTask2"
                   }
                ],      
                "isAPred":false,
                "isAMember":true
            },
            "PM-Photo":{
                "predName":"Ольга крылова",
                "newsList":{},
                "taskList":[         
                    {
                        "title":"titleTask1",
                        "description":"descriptionTask1"
                    },
                   {
                        "title":"titleTask2",
                        "description":"descriptionTask2"
                   }
                ],
                "isAPred":true,
                "isAMember":true
            },
            "HR":{
                "predName":"Ольга крылова",
                "newsList":{},
                "taskList":[         
                    {
                        "title":"titleTask1",
                        "description":"descriptionTask1"
                    },
                   {
                        "title":"titleTask2",
                        "description":"descriptionTask2"
                   }
                ],
                "isAPred":true,
                "isAMember":true
            },
            "pm-profi":{
                "predName":"Ольга крылова",
                "newsList":{},
                "taskList":[         
                    {
                        "title":"titleTask1",
                        "description":"descriptionTask1"
                    },
                   {
                        "title":"titleTask2",
                        "description":"descriptionTask2"
                   }
                ],
                "isAPred":true,
                "isAMember":false
            },
            "funcom":{
                "predName":"Ольга крылова",
                "newsList":{},
                "taskList":[         
                    {
                        "title":"titleTask1",
                        "description":"descriptionTask1"
                    },
                   {
                        "title":"titleTask2",
                        "description":"descriptionTask2"
                   }
                ],
                "isAPred":true,
                "isAMember":true
            },
            "sportcom":{
                "predName":"Ольга крылова",
                "newsList":{},
                "taskList":[         
                    {
                        "title":"titleTask1",
                        "description":"descriptionTask1"
                    },
                   {
                        "title":"titleTask2",
                        "description":"descriptionTask2"
                   }
                ],
                "isAPred":true,
                "isAMember":true
            },
            "mounting":{
                "predName":"Ольга крылова",
                "newsList":{},
                "taskList":[         
                    {
                        "title":"titleTask1",
                        "description":"descriptionTask1"
                    },
                   {
                        "title":"titleTask2",
                        "description":"descriptionTask2"
                   }
                ],
                "isAPred":true,
                "isAMember":true
            },
            "cultmass":{
                "predName":"Ольга крылова",
                "newsList":{},
                "taskList":[         
                    {
                        "title":"titleTask1",
                        "description":"descriptionTask1"
                    },
                   {
                        "title":"titleTask2",
                        "description":"descriptionTask2"
                   }
                ],
                "isAPred":true,
                "isAMember":false
            }
        },
        "newsList":{}
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
                        <ContactBlock comission={this.state.comission} openAuth={this.openAuth}/>
                        <ProjectsBlock />
                    </div>
                </div>
            )
        } else if (page === 'account') {
            fetch(this.props.url + 'persAccInfo/',{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    "login": this.state.login
                }),
            
            })
            .then((response) => {
                return response.JSON
            })
            .then((responseJson)=>{
                    return(
                        <PersonalAccount persAccInfo={responseJson.persAccInfo} url={this.props.url} user={this.state.login}/>
                    )
            })
        } else if (page === 'auth') {
            return <Authorization openAuth={this.openAuth} login={this.login} url={this.props.url}/>
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