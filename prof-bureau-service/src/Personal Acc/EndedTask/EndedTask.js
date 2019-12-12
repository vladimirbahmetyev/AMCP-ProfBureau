import React from 'react';
import "./EndedTask.css"

export default class EndedTask extends React.Component{
    
    state = {
        exampleState: true,
        secondExampleState: 0
    }
    render(){
    return(
        <div className="ended-task-item ended-task-checking">
             <div className="ended-task-name">
                {this.props.taskInfo.title}
             </div>
             <div className="ended-task-state">
                {this.props.taskInfo.description}  
             </div>
        </div>
    )
    }
}