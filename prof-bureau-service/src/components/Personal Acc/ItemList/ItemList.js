import  React from "react"
import "./ItemList.css"

export default class ItemList extends React.Component{
    render(){
        const items = this.props.taskList
        const listItems = items.map((taskInfo)=> <li>{<this.props.type content={taskInfo} function1={this.props.function1} comission={taskInfo.comission} predAction={this.props.predAction}/> }</li>)
    return(        
        <div className="new-tasks-container">
            <h1 className="new-task-title">{this.props.titleName}</h1>
            <ul className="new-tasks-list">
                {listItems}
            </ul>
        </div>
    )
}
}