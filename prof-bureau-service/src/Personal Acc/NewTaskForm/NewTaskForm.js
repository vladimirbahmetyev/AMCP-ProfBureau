import React from 'react';
import "./NewTaskForm.css"

export default class NewTaskForm extends React.Component{
    render(){
        return (
            <div className="new-task-form-back">
                <div className="new-task-form">
                    <label className="new-task-title-form">                        
                        Название задания
                        <input type="text"/>                        
                    </label>
                    <label className="exit-button-form"
                            onClick={this.props.closeClick}
                    >x</label>
                    <textarea className="new-task-description-form">
                        Описание   
                    </textarea> 
                    
                    <label className="new-task-deadline-form">
                        Дедлайн:
                        <input type='date'/>
                    </label>
                    <div className="new-task-picture-container-form">
                        <div><div></div></div>
                        <div><div></div></div>
                        <div><div></div></div>
                    </div>
                    <button className="new-task-add-form">добавить</button>
                </div>
            </div>
        )
    }
}