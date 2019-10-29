import  React from "react"
import "./NewTaskList.css"

export default class NewTaskList extends React.Component{
    constructor(props) {
        super(props)
    }

    state = {
        exampleState: true,
        secondExampleState: 0
    }
    render(){
    return(
        <div className="new-tasks-container">
            <h1 className="new-task-title"> Мой швапс</h1>
            <ul className="new-tasks-list">
                <li className="new-task-item">Название задания</li>
                <li className="new-task-item">Название задания</li>
                <li className="new-task-item">Название задания</li>
                <li className="new-task-item">Название задания</li>
                <li className="new-task-item">Название задания</li>
                <li className="new-task-item">Название задания</li>
                <li className="new-task-item">Название задания</li>
            </ul>
        </div>
    )
}
}