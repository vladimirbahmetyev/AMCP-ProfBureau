import React from 'react';
import "./CurrentComissionTask.css"

export default class CurrentComissionTask extends React.Component{

    state = {
        descriptionClassName:"current-task-description-hide",
        isDescriptionOpen: false,
        comissionName:this.props.comission
    }

    watchClassNames = "current-task-left active-watch-icon " + this.state.descriptionClassName

    onDescpButtonClick = ()=>{
        if(!this.state.isDescriptionOpen){
            this.watchClassNames = "current-task-left active-watch-icon current-task-description-show"
            this.setState({
                descriptionClassName:"current-task-description-show",
                isDescriptionOpen: true
            })        
        }
        else{  
              this.watchClassNames = "current-task-left active-watch-icon current-task-description-hide"
              this.setState({
                descriptionClassName:"current-task-description-hide",
                isDescriptionOpen: false
            })            
         }
    }

    render(){
    return(
        <div className="current-task-item">
            <div className="current-task-item-prev">
                <div className={this.watchClassNames} onClick={this.onDescpButtonClick}>
                    <div className="current-task-eye"></div>
                </div>
                <div className="current-task-right">
                    <div className="current-task-name">
                        {this.props.content.title}
                    </div>
                    <div className="current-task-buttons">
                        <div className="current-task-add"
                             onClick={()=>this.props.function1(this.props.content.title, "take_task/", this.props.comission)}
                        ></div>
                    </div>
                </div>
            </div>
            <div className={this.state.descriptionClassName}>
                {this.props.content.description}
            </div>
        </div>
        )
    }
}