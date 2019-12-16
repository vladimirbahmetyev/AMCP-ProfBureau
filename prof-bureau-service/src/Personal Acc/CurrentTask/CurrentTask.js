import React from 'react';
import "./CurrentTask.css"

export default class CurrentTask extends React.Component{

    state = {
        descriptionState:"current-task-description-hide",
        comissionName:this.props.comission
    }

    watchClassStatus = "current-task-left active-watch-icon " + this.state.descriptionState

    onDescpButtonClick = ()=>{
        if(this.state.descriptionState ==="current-task-description-hide"){
            this.watchClassStatus = "current-task-left active-watch-icon current-task-description-show"
            this.setState({
                descriptionState:"current-task-description-show"
            })        
        }
        else{  
              this.watchClassStatus = "current-task-left active-watch-icon current-task-description-hide"
              this.setState({
                descriptionState:"current-task-description-hide"
            })
            
         }
    }

    render(){
    return(
        <div className="current-task-item">
        <div className="current-task-item-prev">
            <div className={this.watchClassStatus} onClick={this.onDescpButtonClick}>
                <div className="current-task-eye"></div>
            </div>
            <div className="current-task-right">
                <div className="current-task-name">
                    {this.props.content.title}
                </div>
                <div className="current-task-buttons">
                     <div className="current-task-send" onClick={()=>this.props.function1(this.props.content.title, "send_task/", this.props.comission, this.props.predAction)}></div>
                     <div className="current-task-delete" onClick={()=>this.props.function1(this.props.content.title, "decline_task/", this.props.comission, this.props.predAction)}></div>
                </div>
            </div>
        </div>
        <div className={this.state.descriptionState}>
                {this.props.content.description}
            </div>
        </div>
        )
    }
}