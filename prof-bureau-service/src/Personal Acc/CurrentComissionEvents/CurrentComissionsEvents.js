import  React from "react"
import "./CurrentComissionsEvents.css"

export default class CurrentComissionEvents extends React.Component{
    state = {
        exampleState: true,
        secondExampleState: 0
    }
    render(){
    return(
        <div className="events-block-container">
            <h1 className="new-task-title">{this.props.titleName}</h1>
            <div className="events-container"></div>
        </div>
    )
}
}