import  React from "react"
import './PersonalAcc.css'
import HeaderPB from "./HeaderPB"
import ComissionsTable from "./ComissionsAndActionsTable/ComissionsTable"
import ActionsTable from "./ComissionsAndActionsTable/ActionsTable"

import ItemList from "./ItemList/ItemList"

import EndedTask from "./EndedTask/EndedTask"
import CurrentTask from "./CurrentTask/CurrentTask"

export default class PersonalAccount extends React.Component{

    state = {
        exampleState: true,
        secondExampleState: 0
    }
    render(){
    return(
    <div>
    <HeaderPB />
    <section className="comissions-and-actions">
        <ComissionsTable/>
        <ActionsTable/>
    </section>
    <section className="task-status-section">
        <ItemList type={<CurrentTask/>} titleName = "Мой швапс"/>
        <ItemList type={<EndedTask/>} titleName = "Выпитый швапс"/>
    </section>
    </div>)
    }
}