import  React from "react"
import "./ItemList.css"

export default class ItemList extends React.Component{
    state = {
        exampleState: true,
        secondExampleState: 0
    }
    render(){
    return(
        <div className="new-tasks-container">
            <h1 className="new-task-title">{this.props.titleName}</h1>
            <ul className="new-tasks-list">
                <li>{this.props.type}</li>
                <li>{this.props.type}</li>
                <li>{this.props.type}</li>
                <li>{this.props.type}</li>
                <li>{this.props.type}</li>
            </ul>
        </div>
    )
}
}