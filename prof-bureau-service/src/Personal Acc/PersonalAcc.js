import  React from "react"
import './PersonalAcc.css'
import HeaderPB from "./HeaderPB"
import ComissionsTable from "./ComissionsAndActionsTable/ComissionsTable"
import ActionsTable from "./ComissionsAndActionsTable/ComissionsTable"
import CurrentTaskList from "./CurrentTasksForm/CurrentTaskList"
import EndedTaskList from "./EndedTasksForm/EndedTaskList"

export default class PersonalAccount extends React.Component{
    constructor(props) {
        super(props)
    }

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
        <CurrentTaskList/>
        <EndedTaskList/>
    </section>
    </div>)
    }
}