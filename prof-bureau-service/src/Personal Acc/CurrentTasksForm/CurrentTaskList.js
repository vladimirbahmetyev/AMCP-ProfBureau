import  React from "react"
import "./CurrentTaskList.css"
import "./CurrentTask"
import CurrentTask from "./CurrentTask"

export default class CurrentTaskList extends React.Component{
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
                <li><CurrentTask/></li>
                <li><CurrentTask/></li>
                <li><CurrentTask/></li>
                <li><CurrentTask/></li>
                <li><CurrentTask/></li>
            </ul>
        </div>
    )
}
}