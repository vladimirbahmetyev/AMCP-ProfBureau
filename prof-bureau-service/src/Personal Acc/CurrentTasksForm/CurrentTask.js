import React from 'react';
import "./CurrentTask.css"

export default class CurrentTask extends React.Component{
    constructor(props) {
        super(props)
    }

    state = {
        descriptionState:"current-task-description-hide"
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
            <div className={this.watchClassStatus} onClick={this.onDescpButtonClick}></div>
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
        <div className={this.state.descriptionState}>
                описание какого то задания бла бла бла авпвапывпвпвыаыа
            </div>
        </div>
        )
    }
}