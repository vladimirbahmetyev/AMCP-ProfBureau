import React from 'react';
import "./CurrentTask.css"

export default class CurrentTask extends React.Component{
    constructor(props) {
        super(props)
    }

    state = {
        exampleState: true,
        secondExampleState: 0
    }
    render(){
    return(
        <div className="current-task-item">
            <div className="current-task-left"></div>
            <div className="current-task-right">
                <div className="current-task-name">
                    Название задания
                </div>
                <div className="current-task-buttons">
                     <div className="current-task-send"></div>
                     <div className="current-task-delete"></div>
                </div>
            </div>
        </div>
    )
}
}