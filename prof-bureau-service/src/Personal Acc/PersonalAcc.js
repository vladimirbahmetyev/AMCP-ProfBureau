import  React from "react"
import './PersonalAcc.css'
import HeaderPB from "./HeaderPB"
import ComissionsTable from "./ComissionsTable/ComissionsTable"
import ActionsTable from "./ActionsTable/ActionsTable"
import CurrentComissionEvents from "./CurrentComissionEvents/CurrentComissionsEvents";
import AboutComPred from "./AboutComPred/AboutComPred";

import ItemList from "./ItemList/ItemList"

import FadeAnimationComponent from "./FadeAnimationComponent/FadeAnimationComponent";
import CurrentComissionTask from "./CurrentComissionTask/CurrentComissionTask"
import EndedTask from "./EndedTask/EndedTask"
import CurrentTask from "./CurrentTask/CurrentTask"

export default class PersonalAccount extends React.Component{

    state = {
        isAPred: false,
        selectComission:"none",
        topRightBlock: <ActionsTable/>,
        bottomLeftBlock: <ItemList type={<CurrentTask/>} titleName = "Мой швапс"/>,
        bottomRightBlock: <ItemList type={<EndedTask/>} titleName = "Выпитый швапс"/>,
        isRedrawNeeded : false
    }
    
    redrawCallback = ()=>{
        this.setState({
            isAPred: this.state.isAPred,
            selectComission: this.state.selectComission,
            isRedrawNeeded: false
        })                           
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
                bottomLeftBlock: <ItemList type={<CurrentTask/>} titleName = "Мой швапс"/>,
                bottomRightBlock: <ItemList type={<EndedTask/>} titleName = "Выпитый швапс"/>,
            })
        }
        else{
            this.setState({
                isAPred:false,
                selectComission: pushedCom.comName,
                topRightBlock: <AboutComPred predName={pushedCom.predName} selectComission={pushedCom.comName} comState={this.state}/>,
                // Fix open item staying when comission had been changed 
                bottomLeftBlock: <ItemList type={<CurrentComissionTask/>} titleName={`Актуальный швапc ${pushedCom.comName}`}/>,
                bottomRightBlock: <CurrentComissionEvents titleName="Швапс комиссии"/>,
                isRedrawNeeded: true 
            })            
        }
    }
    render(){
    return(
    <div>
    <HeaderPB/>
    <section className="comissions-and-actions">
        <ComissionsTable onClickCom={this.comTableListener}/>
        
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