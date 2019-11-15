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
        isComShow: false,
        isComChange : false
    }
    
    revertFadeSwitcher = ()=>{
        this.setState({
            isAPred:false,
            selectComission: this.state.selectComission,
            predName:this.state.predName,
            isComShow: true,
            isComChange : false
        })                           
    }

    comTableListener = (pushedCom)=>{
        if (pushedCom ==="none") {
            this.setState({
                isAPred: false,
                selectComission:"none",
                isComShow: false,
                isComChange : false
            })
        }
        else{
            this.setState({
                isAPred:false,
                selectComission: pushedCom.comName,
                predName:pushedCom.predName,
                isComShow: true,
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
        
        <CssTransition 
        classNames="fade-title"
        timeout={600}
        unmountOnExit
        mountOnEnter
        in={!this.state.isComShow}
        >
        <ActionsTable/>
        </CssTransition>

        <FadeBlock 
        switcher={this.revertFadeSwitcher} 
        isBlockChange={this.state.isComChange} 
        fadeBlock={<AboutComPred comState={this.state}/>}
        />
        
        

    </section>
        <CssTransition 
        classNames="fade"
        timeout={600}
        mountOnEnter
        unmountOnExit
        in={!this.state.isComShow}
        >
            <section className="task-status-section">
              <ItemList type={<CurrentTask/>} titleName = "Мой швапс"/>
              <ItemList type={<EndedTask/>} titleName = "Выпитый швапс"/> 
            </section>
        </CssTransition>

        <CssTransition 
        classNames="fade"
        timeout={600}
        unmountOnExit
        mountOnEnter
        in={this.state.isComShow}
        >
            <section className="task-status-section">
                    <FadeBlock 
                switcher={this.revertFadeSwitcher} 
                isBlockChange={this.state.isComChange} 
                fadeBlock={<ItemList type={<CurrentComissionTask/>} titleName="Актуальный швапс"/>}
                />
                
                <FadeBlock 
                switcher={this.revertFadeSwitcher} 
                isBlockChange={this.state.isComChange} 
                fadeBlock={<CurrentComissionEvents titleName="Швапс комиссии"/>}
                />
            </section>
        </CssTransition>
    </div>)
    }
}