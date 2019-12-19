import  React from "react"
import './PersonalAcc.css'

import ItemList from "./ItemList/ItemList"

import FadeAnimationComponent from "./FadeAnimationComponent/FadeAnimationComponent";

import ComissionsTable from "./ComissionsTable/ComissionsTable"
import ActionsTable from "./ActionsTable/ActionsTable"
import CurrentComissionEvents from "./CurrentComissionEvents/CurrentComissionsEvents";
import AboutComPred from "./AboutComPred/AboutComPred";
import CurrentComissionTask from "./CurrentComissionTask/CurrentComissionTask"
import EndedTask from "./EndedTask/EndedTask"
import CurrentTask from "./CurrentTask/CurrentTask"
import PredControlPanel from "./PredControlPanel/PredControlPanel"

import NewTaskForm from "./NewTaskForm/NewTaskForm"
import EntryWindow from "./entryComissionWindow/EntryComissionWindow"

import CssTransition from "react-transition-group/CSSTransition"

export default class PersonalAccount extends React.Component{

    actionWithTask = (taskTitle, action, comissionLabel, isAPredAction)=>{
        console.log(JSON.stringify({
            "stNum":this.props.user,
            "taskTitle": taskTitle,
            "comName":comissionLabel,
            "predAction": isAPredAction 
        }))
        fetch(this.props.url + action,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                "stNum":this.props.user,
                "taskTitle": taskTitle,
                "comName":comissionLabel,
                "predAction": isAPredAction 
            })
        })
        .then((response)=>{
            return response.json()
        })
        .then((responseJson)=>{
            if(responseJson.success){
                console.log(JSON.stringify(responseJson))
                if(action=== "take_task/")
                this.setState({
                    userTasks:responseJson.userTasks,
                    isRedrawNeeded: true,
                    userTasksEnded: responseJson.userTasksEnded,                    
                    bottomLeftBlock: <ItemList type={CurrentComissionTask} titleName = {comissionLabel} taskList={responseJson.comTasks} function1={this.actionWithTask}/>
                })
                else{
                    if(isAPredAction){
                        let newComInfo = this.state.comInfo
                        newComInfo[comissionLabel].taskList = responseJson.comTasks
                        newComInfo.userTasks = responseJson.userTasks
                        newComInfo[comissionLabel].sentTasks = responseJson.sentTasks
                        newComInfo.userTasksEnded = responseJson.userTasksEnded
                        this.setState({
                            userTasks:responseJson.userTasks,
                            userTasksEnded: responseJson.userTasksEnded,
                            bottomLeftBlock: <ItemList type={CurrentComissionTask} 
                                               titleName={`Актуальный швапc ${comissionLabel}`} 
                                               taskList={responseJson.comTasks}
                                               function1={this.actionWithTask}
                                               predAction={false}/>,
                            bottomRightBlock: <ItemList type={CurrentTask} 
                                                titleName={`Задания на проверку`} 
                                                taskList={responseJson.sentTasks}
                                                function1={this.actionWithTask}
                                                predAction={true}/>,
                            isRedrawNeeded: true,
                            comInfo: newComInfo
                        })
                    }
                    else{      

                    let newComInfo = this.state.comInfo
                    newComInfo[comissionLabel].sentTasks = responseJson.sentTasks
                    newComInfo[comissionLabel].taskList = responseJson.comTasks
                    
                    this.setState({
                        isRedrawNeeded: true,
                        userTasks:responseJson.userTasks,
                        userTasksEnded: responseJson.userTasksEnded,
                        bottomLeftBlock: <ItemList type={CurrentTask} titleName = "Мой Швапс" taskList={responseJson.userTasks} function1={this.actionWithTask} predAction={false}/>,
                        bottomRightBlock: <ItemList type={EndedTask} titleName = "Выпитый Швапс" taskList={responseJson.userTasksEnded} function1={this.actionWithTask}/>,
                        comInfo: newComInfo
                    })
                    }
                }
            }
            else{
                console.log(responseJson.error)
            }
        })
    }
    //Забавный баг: если данную функцию поставить после стейта, тогда js не может ее найти и не считает это функцией
    state = {
        isAPred: false,
        isRedrawNeeded : false,
        isNewTaskFormOpen: false,
        isEntryOpen:false,

        selectComission:"none",

        comInfo: this.props.persAccInfo.comInfo,
        userTasks: this.props.persAccInfo.userTasks,
        userTasksEnded: this.props.persAccInfo.userTasksEnded,

                
        topRightBlock: <ActionsTable/>,//Добавить блок для отрисовки новостей
        bottomLeftBlock: <ItemList type={CurrentTask} titleName = "Мой швапс" taskList={this.props.persAccInfo.userTasks} function1={this.actionWithTask} predAction={false}/>,
        bottomRightBlock: <ItemList type={EndedTask} titleName = "Выпитый швапс" taskList={this.props.persAccInfo.userTasksEnded}/>,        
    }
    
    addNewTask = (newTaskTitle, newTaskDescription, deadline)=>{
        fetch(this.props.url + 'add_task/',{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                "stNum":this.props.user,
                "title":newTaskTitle,
                "description": newTaskDescription,
                "deadline": deadline
            })
        })
        .then((response)=>{
            return response.json()
        })
        .then((responseJson)=>{
            if(responseJson.success){
                let newComInfo = this.state.comInfo
                newComInfo[responseJson.comName].taskList = responseJson.comTasks
                this.setState({
                    comInfo: newComInfo,
                    isNewTaskFormOpen: false,
                    bottomLeftBlock: <ItemList 
                                type={CurrentComissionTask} 
                                titleName = {responseJson.comName} 
                                taskList={responseJson.comTasks} 
                                function1={this.actionWithTask}/>,
                    isRedrawNeeded:true,
                })
            }
            else{
                console.log(responseJson.error)
            }
        })
    }

    actionWithComission = (comName, action)=>{
        fetch(this.props.url + "enter_or_leave_com/",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                "stNum":this.props.user,
                "comName": comName,
                "action":action
            })
        })
        .then((response)=>{
            return response.json()
        })
        .then((responseJson)=>{
            if(responseJson.success){
                
                let newComInfo = this.state.comInfo
                if(action === "enter"){
                    newComInfo[comName].isAMember = true
                    this.setState({
                        comInfo: newComInfo,
                        isEntryOpen: false,
                        topRightBlock: this.topRightBlock({"comName":comName, "predName":responseJson.predName}, this.state.comInfo[comName].isAPred),
                        bottomLeftBlock: <ItemList type={CurrentComissionTask} 
                                            titleName={`Актуальный швапc ${comName}`} 
                                            taskList={this.state.comInfo[comName].taskList}
                                            function1={this.actionWithTask}/>,
                        bottomRightBlock: <CurrentComissionEvents titleName="Швапс комиссии" newsList={this.state.comInfo[comName].news}/>,
                        isRedrawNeeded: true
                    })    
                }
                else {
                    newComInfo[comName].isAMember = false
                    this.setState({
                        comInfo:newComInfo,
                        selectComission:"none",
                        isRedrawNeeded: true,
                        topRightBlock: <ActionsTable/>,
                        bottomLeftBlock: <ItemList type={CurrentTask} titleName = "Мой швапс" taskList={this.state.userTasks} function1={this.actionWithTask} predAction={false}/>,
                        bottomRightBlock: <ItemList type={EndedTask} titleName = "Выпитый швапс" taskList={this.state.userTasksEnded}/>
                    })
                }
                
            }
            else{
                console.log(responseJson.error)
            }
        })
    }

    redrawCallback = ()=>{
        this.setState({
            isRedrawNeeded: false
        })                           
    }

    onClickAddNewTask = ()=>{
        this.setState({isNewTaskFormOpen:true})
    
    }
    onClickCloseNewTask = ()=>{
        this.setState({isNewTaskFormOpen:false})
    }
    
    onClickEntry = (selectComission)=>{
        this.setState({
            selectComission:selectComission,
            isEntryOpen:true
        })
    
    }
    onClickCloseEntry = ()=>{
        this.setState({isEntryOpen:false})
    }

    
    //Предлагаю устанавливать инфу о преде как сравнение ссылка на вк пользователя=== ссылка на вк преда (из бд)
    //Придумать откуда брать инфу, являетс человек предом или нет и засунуть сюда
    topRightBlock = (pushedCom, predStatus)=>{
        if(predStatus)
            return <PredControlPanel onAddNewTask={this.onClickAddNewTask} />
        else
            return <AboutComPred predName={pushedCom.predName} selectComission={pushedCom.comName} comState={this.state} exitFunction={this.actionWithComission}/>
    }

    comTableListener = (pushedCom)=>{
        if(pushedCom.comName === this.state.selectComission)
            return

        if (pushedCom.comName ==="none") {
            this.setState({
                isAPred: false,
                selectComission:"none",
                isRedrawNeeded: true,
                topRightBlock: <ActionsTable/>,
                bottomLeftBlock: <ItemList type={CurrentTask} titleName = "Мой швапс" taskList={this.state.userTasks} function1={this.actionWithTask} predAction={false}/>,
                bottomRightBlock: <ItemList type={EndedTask} titleName = "Выпитый швапс" taskList={this.state.userTasksEnded}/>,
            })
        }
        else{
            if(this.state.comInfo[pushedCom.comName].isAPred){
                this.setState({
                    isAPred: true,
                    selectComission: pushedCom.comName,
                    topRightBlock: this.topRightBlock(pushedCom, this.state.comInfo[pushedCom.comName].isAPred),
                    // Fix open item staying when comission had been changed 
                    bottomLeftBlock: <ItemList type={CurrentComissionTask} 
                                               titleName={`Актуальный швапc ${pushedCom.comName}`} 
                                               taskList={this.state.comInfo[pushedCom.comName].taskList}
                                               function1={this.actionWithTask}
                                               predAction={false}/>,
                    bottomRightBlock: <ItemList type={CurrentTask} 
                                                titleName={`Задания на проверку`} 
                                                taskList={this.state.comInfo[pushedCom.comName].sentTasks}
                                                function1={this.actionWithTask}
                                                predAction={true}/>,
                    isRedrawNeeded: true 
                })    
            }
            else{
            this.setState({
                isAPred: false,
                selectComission: pushedCom.comName,
                topRightBlock: this.topRightBlock(pushedCom, this.state.comInfo[pushedCom.comName].isAPred),
                // Fix open item staying when comission had been changed 
                bottomLeftBlock: <ItemList type={CurrentComissionTask} 
                                           titleName={`Актуальный швапc ${pushedCom.comName}`} 
                                           taskList={this.state.comInfo[pushedCom.comName].taskList}
                                           function1={this.actionWithTask}/>,
                bottomRightBlock: <CurrentComissionEvents titleName="Швапс комиссии" newsList={this.state.comInfo[pushedCom.comName].news}/>,
                isRedrawNeeded: true 
            })            
        }}
    }
    render(){
    return(
    <div style={{fontFamily: 'PFBeauSansPro-light'}}>
    
    <CssTransition
                classNames="fade"
                timeout={600}
                unmountOnExit
                mountOnEnter
                in={this.state.isNewTaskFormOpen}>
                    <NewTaskForm closeClick={this.onClickCloseNewTask} addClick={this.addNewTask}/>
    </CssTransition>

    <CssTransition
                classNames="fade"
                timeout={600}
                unmountOnExit
                mountOnEnter
                in={this.state.isEntryOpen}>
                <EntryWindow actionOnEntry={this.actionWithComission} closeClick={this.onClickCloseEntry} comName={this.state.selectComission}/>
    </CssTransition>

    <section className="comissions-and-actions">
        <ComissionsTable onClickCom={this.comTableListener} comInfo={this.state.comInfo} entryFunction={this.onClickEntry}/>
        
        <FadeAnimationComponent 
        redrawCallback={this.redrawCallback} 
        isRedrawNeeded={this.state.isRedrawNeeded} 
        fadeBlock={this.state.topRightBlock}
        />      
    </section>
    
    <section className="task-status-section">
    <FadeAnimationComponent 
        redrawCallback={this.redrawCallback} 
        isRedrawNeeded={this.state.isRedrawNeeded} 
        fadeBlock={this.state.bottomLeftBlock}
        />
    <FadeAnimationComponent 
        redrawCallback={this.redrawCallback} 
        isRedrawNeeded={this.state.isRedrawNeeded} 
        fadeBlock={this.state.bottomRightBlock}
        />      
    </section>
    </div>)
    }
}