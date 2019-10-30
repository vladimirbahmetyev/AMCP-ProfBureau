import  React from "react"
import "./EndedTaskList.css"
import EdnedTask from "./EndedTask"
import EndedTask from "./EndedTask"

export default class EndedTaskList extends React.Component{
    constructor(props) {
        super(props)
    }

    state = {
        exampleState: true,
        secondExampleState: 0
    }
    render(){
    return(
        <div className="ended-tasks-container">
            <h1 className="ended-task-title">Выпитый швапс</h1>
            <ul className="ended-tasks-list">
                <li><EndedTask/></li>
                <li><EndedTask/></li>
                <li><EndedTask/></li>
            </ul>
        </div>
    )}}