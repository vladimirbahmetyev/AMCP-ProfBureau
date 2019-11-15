import  React from "react"
import './PersonalAcc.css'
import HeaderPB from "./HeaderPB"
import ComissionsTable from "./ComissionsTable/ComissionsTable"
import ActionsTable from "./ActionsTable/ActionsTable"
import CurrentComissionEvents from "./CurrentComissionEvents/CurrentComissionsEvents";
import AboutComPred from "./AboutComPred/AboutComPred";
import CssTransition from "react-transition-group/CSSTransition"

import ItemList from "./ItemList/ItemList"

import FadeBlock from "./BlockFadeAnimation/FadeBlock";
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
        isComChange : false
    }
    
    revertFadeSwitcher = ()=>{
        this.setState({
            isAPred:false,
            selectComission: this.state.selectComission,
            predName:this.state.predName,
            isComChange : false
        })                           
    }

    comTableListener = (pushedCom)=>{
        if (pushedCom ==="none") {
            this.setState({
                isAPred: false,
                selectComission:"none",
                isComChange : true,
                topRightBlock: <ActionsTable/>,
                bottomLeftBlock: <ItemList type={<CurrentTask/>} titleName = "Мой швапс"/>,
                bottomRightBlock: <ItemList type={<EndedTask/>} titleName = "Выпитый швапс"/>,
            })
        }
        else{
            this.setState({
                isAPred:false,
                selectComission: pushedCom.comName,
                predName:pushedCom.predName,
                topRightBlock: <AboutComPred predName={pushedCom.predName}selectComission={pushedCom.comName} comState={this.state}/>,
                bottomLeftBlock: <ItemList type={<CurrentComissionTask/>} titleName="Актуальный швапс"/>,
                bottomRightBlock: <CurrentComissionEvents titleName="Швапс комиссии"/>,
                isComChange : true 
            })            
        }
    }
    render(){
    return(
    <div>
    <HeaderPB/>
    <section className="comissions-and-actions">
        <ComissionsTable onClickCom={this.comTableListener}/>
        
        <FadeBlock 
        switcher={this.revertFadeSwitcher} 
        isBlockChange={this.state.isComChange} 
        fadeBlock={this.state.topRightBlock}
        />      
    </section>
    
    <section className="task-status-section">
    <FadeBlock 
        switcher={this.revertFadeSwitcher} 
        isBlockChange={this.state.isComChange} 
        fadeBlock={this.state.bottomLeftBlock}
        />
        <FadeBlock 
        switcher={this.revertFadeSwitcher} 
        isBlockChange={this.state.isComChange} 
        fadeBlock={this.state.bottomRightBlock}
        />      
    </section>
    </div>)
    }
}