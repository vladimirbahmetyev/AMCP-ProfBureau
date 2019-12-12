import  React from "react"
import "./ItemList.css"

export default class ItemList extends React.Component{
    render(){
        const listItems = this.props.taskList.map((taskInfo)=> <li>{<this.props.type content={taskInfo}/>}</li>)
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