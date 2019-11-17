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
                            onClick={this.props.closeClick}></label>
                    <textarea className="new-task-description-form"
                    placeholder='Описание'>
                    </textarea> 
                    
                    <label className="new-task-deadline-form">
                        Дедлайн:
                        <input type='date' className='new-task-input-date'/>
                    </label>
                    <div className="new-task-picture-container-form">
                        <div><div></div></div>
                        <div><div></div></div>
                        <div><div></div></div>
                    </div>
                    <button className="new-task-add-form">Добавить</button>
                </div>
            </div>
        )
    }
}