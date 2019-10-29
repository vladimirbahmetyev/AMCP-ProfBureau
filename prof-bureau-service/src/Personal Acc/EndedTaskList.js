import  React from "react"
import "./EndedTaskList.css"

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
                <li className="ended-task-item finish-task">Название задания</li>
                <li className="ended-task-item">Название задания</li>
                <li className="ended-task-item">Название задания</li>
                <li className="ended-task-item">Название задания</li>
                <li className="ended-task-item">Название задания</li>
                <li className="ended-task-item">Название задания</li>
                <li className="ended-task-item">Название задания</li>
            </ul>
        </div>
    )}}