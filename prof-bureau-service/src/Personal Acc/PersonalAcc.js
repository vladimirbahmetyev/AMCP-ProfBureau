import  React from "react"
import './PersonalAcc.css'
import HeaderPB from "./HeaderPB"
import ComissionsTable from "./ComissionsAndActionsTable/ComissionsTable"
import ActionsTable from "./ComissionsAndActionsTable/ActionsTable"
// import CurrentComissionEvents from "./CurrentComissionEvents/CurrentComissionsEvents";

import ItemList from "./ItemList/ItemList"

// import CurrentComissionTask from "./CurrentComissionTask/CurrentComissionTask"
import EndedTask from "./EndedTask/EndedTask"
import CurrentTask from "./CurrentTask/CurrentTask"

export default class PersonalAccount extends React.Component{

    state = {
        isAPred: false,
        selectComission:"none"
    }

    comTableListener = (pushedCom)=>{
        this.setState({
            isAPred:false,
            selectComission: pushedCom
        })
    }
    render(){
    return(
    <div>
    <HeaderPB />
    <section className="comissions-and-actions">
        <ComissionsTable onClickCom={this.comTableListener}/>
        <ActionsTable/>
    </section>
    <section className="task-status-section">
        <ItemList type={<CurrentTask/>} titleName = "Актуальный швапс"/>
        {/* <CurrentComissionEvents titleName="Швапс комиссии   "/> */}
        <ItemList type={<EndedTask/>} titleName = "Выпитый швапс"/>
    </section>
    </div>)
    }
}