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

import CssTransition from "react-transition-group/CSSTransition"

export default class PersonalAccount extends React.Component{

    state = {
        isAPred: false,
        selectComission:"none",
        topRightBlock: <ActionsTable/>,//Добавить блок для отрисовки новостей
        bottomLeftBlock: <ItemList type={CurrentTask} titleName = "Мой швапс" taskList={this.props.persAccInfo.userTasks}/>,
        bottomRightBlock: <ItemList type={EndedTask} titleName = "Выпитый швапс" taskList={this.props.persAccInfo.EndedTask}/>,
        isRedrawNeeded : false,
        isNewTaskFormOpen: false,
        comInfo: this.props.persAccInfo.comissionsInfo,
        usersTask: this.props.persAccInfo.userTasks,
        endedTasks: this.props.persAccInfo.endedTasks
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
    //Предлагаю устанавливать инфу о преде как сравнение ссылка на вк пользователя=== ссылка на вк преда (из бд)
    //Придумать откуда брать инфу, являетс человек предом или нет и засунуть сюда
    topRightBlock = (pushedCom, predStatus)=>{
        if(predStatus)
            return <PredControlPanel onAddNewTask={this.onClickAddNewTask} />
        else
            return <AboutComPred predName={pushedCom.predName} selectComission={pushedCom.comName} comState={this.state}/>
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
                bottomLeftBlock: <ItemList type={CurrentTask} titleName = "Мой швапс" taskList={this.state.usersTask}/>,
                bottomRightBlock: <ItemList type={EndedTask} titleName = "Выпитый швапс" taskList={this.state.endedTasks}/>,
            })
        }
        else{
            this.setState({
                isAPred: this.state.comInfo[pushedCom.comName].isAPred,
                selectComission: pushedCom.comName,
                topRightBlock: this.topRightBlock(pushedCom, this.state.comInfo[pushedCom.comName].isAPred),
                // Fix open item staying when comission had been changed 
                bottomLeftBlock: <ItemList type={CurrentComissionTask} titleName={`Актуальный швапc ${pushedCom.comName}`} taskList={this.state.comInfo[pushedCom.comName].taskList}/>,
                bottomRightBlock: <CurrentComissionEvents titleName="Швапс комиссии" newsList={this.state.comInfo[pushedCom.comName].news}/>,
                isRedrawNeeded: true 
            })            
        }
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
                    <NewTaskForm closeClick={this.onClickCloseNewTask}/>
    </CssTransition>

    <section className="comissions-and-actions">
        <ComissionsTable onClickCom={this.comTableListener} comInfo={this.state.comInfo}/>
        
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